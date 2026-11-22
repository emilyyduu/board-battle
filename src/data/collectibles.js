// Every creature a kid can collect. Rarity decides how often it drops.
const collectibles = [
  { id: "pencil-pete", name: "Pencil Pete", emoji: "✏️", rarity: "common" },
  { id: "rubber-duckulator", name: "Rubber Duckulator", emoji: "🦆", rarity: "common" },
  { id: "gluestick-gus", name: "Gluestick Gus", emoji: "🧴", rarity: "common" },
  { id: "sneaky-sock", name: "Sneaky Sock", emoji: "🧦", rarity: "common" },
  { id: "captain-crayon", name: "Captain Crayon", emoji: "🖍️", rarity: "rare" },
  { id: "professor-pineapple", name: "Professor Pineapple", emoji: "🍍", rarity: "rare" },
  { id: "bubble-tea-bandit", name: "Bubble Tea Bandit", emoji: "🧋", rarity: "rare" },
  { id: "dino-detective", name: "Dino Detective", emoji: "🦖", rarity: "epic" },
  { id: "rocket-raccoon-chef", name: "Space Chef Raccoon", emoji: "🦝", rarity: "epic" },
  { id: "toasty-time-traveller", name: "Toasty the Time Traveller", emoji: "🍞", rarity: "legendary" },
];

// Chance out of 100 for each rarity
export const rarityWeights = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3,
};

export default collectibles;
