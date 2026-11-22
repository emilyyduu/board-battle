import collectibles, { rarityWeights } from "../data/collectibles";

// Step 1: roll a rarity using the weights (e.g. 60% common, 3% legendary)
function rollRarity() {
  const roll = Math.random() * 100;
  let total = 0;
  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    total += weight;
    if (roll < total) return rarity;
  }
  return "common";
}

// Step 2: pick a random creature of that rarity
export function rollCollectible() {
  const rarity = rollRarity();
  const pool = collectibles.filter((c) => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
