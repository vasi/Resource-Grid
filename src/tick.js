import store from "./store.js";
// eslint-disable-next-line
import { DefaultSave } from "./saveload.js";
import { save } from "./saveload.js";
import { Resources, ResourceArr, getCooldown, canBuy, AutoConnected, isUnlocked } from "./data/resources.js";
import { craftStart, craftUpdate, resourceUnlock, removeEmpowerer, resetResourceData } from "./modules/resources.js";
import { unlockTab } from "./modules/aside.js";
import { endPrestige, endRespec } from "./modules/prestige.js";

const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
let lastSave = new Date().getTime();

function Tick() {
  /**
   * @type {DefaultSave}
   */
  const savefile = store.getState();
  const Time = new Date().getTime();

  if (Time - lastSave > 5000) {
    lastSave = Time;
    save(savefile);
  }

  // Resources
  for (let i = 0; i < ResourceArr.length; i++) {
    const Resource = ResourceArr[i];
    if (Resource === null) continue;
    const order = i;
    const save = savefile.resources[order];
    const isAuto = 1 <= savefile.resources[AutoConnected[order]]?.have;

    // Check Unlocked
    if (!save.unlocked && (save.have >= 1 || isUnlocked(Resource.name, savefile.resources))) {
      store.dispatch(resourceUnlock(order));
    }

    // Start Automate
    if (Resource.automates && save.have >= 1) {
      for (let j = 0; j < Resource.automates.length; j++) {
        const _Resource = Resources[Resource.automates[j]];
        const _order = _Resource.order;
        if (
          savefile.resources[_order].lastTime !== null ||
          canBuy(_Resource.name, savefile) === 0 ||
          savefile.resources[_order].automationDisabled
        ) continue;
        store.dispatch(craftStart(_order, true));
      }
    }

    // Check craft end
    const lastTime = save.lastTime;
    if (lastTime !== null && Resource.craftTime !== undefined) {
      let craftTime = getCooldown(Resource.name, savefile);
      let progressIncrement = (Time - lastTime)/craftTime * (devMode ? 30 : 1);
      store.dispatch(craftUpdate({
        order: i,
        isAuto,
        Time,
        progressIncrement,
        dontUpdate: savefile.prestige.doingPrestige
      }));
    }
  }

  // Aside
  const unlockStatus = savefile.aside.unlockStatus;
  if (
    !unlockStatus.Prestige &&
    savefile.resources[Resources.DivinePowder.order].have >= 1
  ) {
    store.dispatch(unlockTab('Prestige'));
  }

  // Prestige
  if (
    savefile.prestige.doingPrestige &&
    savefile.prestige.tmpPrestigeResourceQuantity >= 1
  ) {
    store.dispatch(craftUpdate({
      order: Resources.DivineShard.order,
      progressIncrement: savefile.prestige.tmpPrestigeResourceQuantity,
      isAuto: true
    }))
    for (let i = 0; i < ResourceArr.length; i++) {
      store.dispatch(resetResourceData(i));
    }
    store.dispatch(endPrestige());
  }
  // Empowerer Respec
  if (savefile.prestige.doingRespec) {
    for (let i = 0; i < ResourceArr.length; i++) {
      store.dispatch(removeEmpowerer(i));
    }
    store.dispatch(endRespec());
  }
}

export default Tick;
