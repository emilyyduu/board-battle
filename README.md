# ⚔️ Board Battle

A classroom quiz game for a touchscreen board. Two students race to answer questions on the week's content and win collectible creatures they can keep or steal from each other.

## About

Board Battle gives students who finish work early something useful to do, by turning revision of recent content into a quick head-to-head game.

## Features

- **Head-to-head rounds:** Each student has their own answer buttons on their half of the board. The first correct answer wins. A wrong answer locks you out for the round, so guessing doesn't pay off.
- **Collect or steal:** The winner either opens a mystery egg for a random creature or steals one from the other player.
- **28 collectibles across four rarities:** Common, rare, epic and legendary, with weighted drop chances (60%, 25%, 12% and 3%).
- **Classes and students:** Create a class, add students, and let each student pick an emoji character to represent them.
- **Running leaderboard:** Wins and collections are saved, so progress carries over between weekly lessons.
- **Question import:** Paste or upload this week's questions as JSON. Every question is checked before it reaches the game.
- **Designed for a touchscreen board:** Big buttons, large text and a different colour for each side of the board.

## Tech stack

| Tool | Why |
|---|---|
| **React** | The game state changes constantly (scores, rounds, collections), and React updates the screen automatically when state changes. Components make it easy to reuse pieces like the creature card across several screens. |
| **Vite** | Quick to set up, with instant reloads while developing, which makes it easy to tweak how the game feels. |
| **CSS** | Full control over the look. All colours are defined once as variables in `index.css`. |
| **localStorage** | Every student plays on the same classroom board, so saving to that one device is enough for now, with no backend needed. |
| **GitHub + Vercel** | Every push to GitHub automatically updates the live site. |

## Getting started

You'll need [Node.js](https://nodejs.org) installed.

```bash
git clone https://github.com/emilyyduu/board-battle.git
cd board-battle
npm install
npm run dev
```

Then open the `localhost` link shown in the terminal.

## Adding this week's questions

Questions are imported as JSON in this format:

```json
[
  {
    "question": "What is 25% of 80?",
    "options": ["20", "25", "16", "40"],
    "answer": "20"
  }
]
```

Paste the JSON into a class's import box or upload a `.json` file. Questions can be written by hand or generated from a worksheet with an AI tool.

Every question is checked before it's imported. The app catches broken JSON, missing question text, the wrong number of options, and answers that don't match any option, and shows which question has the problem.

## Project structure

```
src/
├── App.jsx              Holds all class data and decides which screen to show
├── components/
│   ├── HomeScreen.jsx       List of classes
│   ├── ClassScreen.jsx      Students, leaderboard and question import for one class
│   ├── Battle.jsx           The game itself: rounds, rewards and stealing
│   ├── PlayerPanel.jsx      One player's half of the board
│   ├── RewardScreen.jsx     Choose a mystery egg or steal
│   ├── StealScreen.jsx      Pick a creature to steal
│   ├── RevealScreen.jsx     Animated reveal of the new creature
│   ├── CollectibleCard.jsx  One creature card, styled by rarity
│   └── ...                  Smaller pieces (question card, leaderboard, forms)
├── data/
│   ├── collectibles.js      All creatures and the rarity drop chances
│   ├── avatars.js           Emoji characters students can pick
│   └── questions.js         Sample questions used until you import your own
└── utils/
    ├── drop.js              Weighted random drops
    ├── storage.js           Saving and loading classes
    └── validateQuestions.js Checks imported questions
```

## How a few things work

- **Random drops:** `drop.js` rolls a rarity first using the weights in `collectibles.js`, then picks a random creature of that rarity. Adding new creatures adds variety without changing how often each rarity drops.
- **One source of truth:** All classes live in one list in `App.jsx`, and every change goes through a single function that also saves it. The battle reads students straight from their class, so the leaderboard and the game can never show different numbers.
- **Game phases:** A battle moves through set stages (question, reward, steal, reveal), and only one shows at a time.

## What's next

- **Sync across devices:** Move storage to a database like Supabase so students can check their collection at home.
- **Generate questions in the app:** Upload the booklet PDF directly and generate questions there, with a review screen before they go live.
- **Protect a favourite:** Let each student protect one creature from being stolen.
