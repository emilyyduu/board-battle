// Every creature a kid can collect. Rarity decides how often it drops.
const collectibles = [
  // Common
  { id: "pencil-pete", name: "Pencil Pete", emoji: "✏️", rarity: "common" },
  { id: "rubber-duckulator", name: "Rubber Duckulator", emoji: "🦆", rarity: "common" },
  { id: "gluestick-gus", name: "Gluestick Gus", emoji: "🧴", rarity: "common" },
  { id: "sneaky-sock", name: "Sneaky Sock", emoji: "🧦", rarity: "common" },
  { id: "eraser-ernie", name: "Eraser Ernie", emoji: "🧽", rarity: "common" },
  { id: "paperclip-pam", name: "Paperclip Pam", emoji: "📎", rarity: "common" },
  { id: "snack-attack-cookie", name: "Snack Attack Cookie", emoji: "🍪", rarity: "common" },
  { id: "grumpy-broccoli", name: "Grumpy Broccoli", emoji: "🥦", rarity: "common" },
  { id: "sleepy-snail", name: "Sleepy Snail", emoji: "🐌", rarity: "common" },
  { id: "lunchbox-larry", name: "Lunchbox Larry", emoji: "🍱", rarity: "common" },
  { id: "bouncy-bean", name: "Bouncy Bean", emoji: "🫘", rarity: "common" },
  { id: "ruler-rex", name: "Ruler Rex", emoji: "📏", rarity: "common" },

  // Rare
  { id: "captain-crayon", name: "Captain Crayon", emoji: "🖍️", rarity: "rare" },
  { id: "professor-pineapple", name: "Professor Pineapple", emoji: "🍍", rarity: "rare" },
  { id: "bubble-tea-bandit", name: "Bubble Tea Bandit", emoji: "🧋", rarity: "rare" },
  { id: "disco-dumpling", name: "Disco Dumpling", emoji: "🥟", rarity: "rare" },
  { id: "ninja-noodle", name: "Ninja Noodle", emoji: "🍜", rarity: "rare" },
  { id: "skateboard-sloth", name: "Skateboard Sloth", emoji: "🦥", rarity: "rare" },
  { id: "detective-donut", name: "Detective Donut", emoji: "🍩", rarity: "rare" },
  { id: "calculator-crab", name: "Calculator Crab", emoji: "🦀", rarity: "rare" },

  // Epic
  { id: "dino-detective", name: "Dino Detective", emoji: "🦖", rarity: "epic" },
  { id: "rocket-raccoon-chef", name: "Space Chef Raccoon", emoji: "🦝", rarity: "epic" },
  { id: "thunder-taco", name: "Thunder Taco", emoji: "🌮", rarity: "epic" },
  { id: "wizard-watermelon", name: "Wizard Watermelon", emoji: "🍉", rarity: "epic" },
  { id: "rocket-flamingo", name: "Rocket Flamingo", emoji: "🦩", rarity: "epic" },

  // Legendary
  { id: "toasty-time-traveller", name: "Toasty the Time Traveller", emoji: "🍞", rarity: "legendary" },
  { id: "king-croissant", name: "King Croissant the Great", emoji: "🥐", rarity: "legendary" },
  { id: "cosmic-squid", name: "Cosmic Squid Supreme", emoji: "🦑", rarity: "legendary" },
];

// Chance out of 100 for each rarity
export const rarityWeights = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3,
};

export default collectibles;