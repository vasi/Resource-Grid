import Resource from "../class/Resource.js"; 

export const Rescources = {
  Tree: new Resource({
    name: "Tree",
    craftTime: 30,
    position: [0, 0]
  }),
  Log: new Resource({
    name: "Log",
    cost: {
      "Tree": 1
    },
    craftTime: 10,
    craftMultiply: 5,
    position: [0, 1]
  }),
  Plank: new Resource({
    name: "Plank",
    cost: {
      "Log": 1
    },
    craftTime: 5,
    position: [0, 2]
  }),
  Charcoal: new Resource({
    name: "Charcoal",
    cost: {
      "Log": 3
    },
    craftTime: 3,
    craftMultiply: 4,
    position: [0, 3]
  }),
  Vine: new Resource({
    name: "Vine",
    position: [0, 5]
  }),
  Mushroom: new Resource({
    name: "Mushroom",
    position: [0, 6]
  }),

  TreeSeed: new Resource({
    name: "Tree Seed",
    description: "Generate tree",
    automates: ["Tree"],
    position: [1, 0]
  }),
  Axe: new Resource({
    name: "Axe",
    description: "Cut tree",
    cost: (have) => ({
      "Log": (have+1)**2,
      "Plank": 3 * (have+1)**2
    }),
    craftTime: 5,
    automates: ["Log"],
    position: [1, 1]
  }),

  Stone: new Resource({
    name: "Stone",
    craftTime: 10,
    position: [2, 0]
  }),
  CopperOre: new Resource({
    name: "Copper Ore",
    position: [2, 1]
  }),
  IronOre: new Resource({
    name: "Iron Ore",
    position: [2, 2]
  }),
  GoldOre: new Resource({
    name: "Gold Ore",
    position: [2, 3]
  }),
  EmeraldStone: new Resource({
    name: "Emerald Stone",
    position: [2, 5]
  }),
  AmethystStone: new Resource({
    name: "Amethyst Stone",
    position: [2, 6]
  }),
  RubyStone: new Resource({
    name: "Ruby Stone",
    position: [2, 7]
  }),
  SapphireStone: new Resource({
    name: "Sapphire Stone",
    position: [2, 8]
  }),

  Pickaxe: new Resource({
    name: "Pickaxe",
    description: "Generate Stone & Ores randomely per second",
    cost: (have) => ({
      "Plank": 5 * (have + 1)**2,
      "Stone": 6 * have**2,
      "Copper": 3 * (have-4)**2,
      "Iron": 5 * (have-9)**2,
      "Gold": 7 * (have-14)**2,
      "Emerald": 4 * (have-19)**1.4,
      "Ruby": 5 * (have-24)**1.4,
    }),
    randomGrantPerSecond: [
      [0.03, "Copper", 3],
      [0.015, "Iron", 8],
      [0.0075, "Gold", 13],
      [0.001, "Emerald", 18],
      [0.0001, "Ruby", 23]
    ],
    effectMultiply: (have) => have**1.5,
    position: [3, 0]
  }),
  Copper: new Resource({
    name: "Copper",
    cost: {
      "CopperOre": 3,
      "Charcoal": 1
    },
    craftTime: 10,
    position: [3, 1]
  }),
  Iron: new Resource({
    name: "Iron",
    cost: {
      "IronOre": 4,
      "Charcoal": 3
    },
    craftTime: 15,
    position: [3, 2]
  }),
  Gold: new Resource({
    name: "Gold",
    cost: {
      "GoldOre": 5,
      "Charcoal": 2,
    },
    position: [3, 3]
  }),
  Emerald: new Resource({
    name: "Emerald",
    cost: {
      "EmeraldStone": 10,
      "Lava": 1
    },
    craftTime: 100,
    position: [3, 5]
  }),
  Amethyst: new Resource({
    name: "Amethyst",
    cost: {
      "AmethystStone": 10,
      "Lava": 2
    },
    craftTime: 150,
    position: [3, 6]
  }),
  Ruby: new Resource({
    name: "Ruby",
    cost: {
      "RubyStone": 10,
      "Lava": 4
    },
    craftTime: 200,
    position: [3, 7]
  }),
  Sapphire: new Resource({
    name: "Sapphire",
    cost: {
      "SapphireStone": 10,
      "Lava": 8
    },
    craftTime: 250,
    position: [3, 8]
  }),

  Water: new Resource({
    name: "Water",
    craftTime: 100,
    position: [5, 0]
  }),
  Lava: new Resource({
    name: "Lava",
    craftTime: 500,
    position: [5, 1]
  }),
  Steam: new Resource({
    name: "Steam",
    cost: {
      "Water": 100,
      "Lava": 8
    },
    craftTime: 300,
    craftMultiply: 100,
    position: [5, 2]
  }),

  Loot: new Resource({
    name: "Loot",
    position: [7, 0]
  })
};

/** @type {Resource[]} */
export const ResourceArr = new Array(81).fill(null);
for (const id in Rescources) {
  /** @type {Resource} */
  const Resource = Rescources[id];
  const position = Resource.position.y + 9*Resource.position.x;
  ResourceArr[position] = Resource;
}

/**
 * @param {string} name 
 * @returns {Resource}
 */
export function getResourceByName(name) {
  return Rescources[name];
}