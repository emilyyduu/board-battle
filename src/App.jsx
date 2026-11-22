import { useState } from "react";
import questions from "./data/questions";
import { rollCollectible } from "./utils/drop";
import { loadCollection, saveCollection } from "./utils/storage";
import StartScreen from "./components/StartScreen";
import QuestionCard from "./components/QuestionCard";
import PlayerPanel from "./components/PlayerPanel";
import RewardScreen from "./components/RewardScreen";
import StealScreen from "./components/StealScreen";
import RevealScreen from "./components/RevealScreen";
import CollectibleCard from "./components/CollectibleCard";
import "./App.css";

function App() {
  // "start" | "question" | "reward" | "steal" | "reveal"
  const [phase, setPhase] = useState("start");
  const [players, setPlayers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lockedOut, setLockedOut] = useState([]); // indexes of players who answered wrong
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [reveal, setReveal] = useState(null); // { item, stolen }

  const current = questions[questionIndex];
  const loserIndex = winnerIndex === 0 ? 1 : 0;

  function startGame(nameA, nameB) {
    setPlayers([
      { name: nameA, collection: loadCollection(nameA) },
      { name: nameB, collection: loadCollection(nameB) },
    ]);
    setPhase("question");
  }

  function updatePlayers(newPlayers) {
    setPlayers(newPlayers);
    newPlayers.forEach((p) => saveCollection(p.name, p.collection));
  }

  function handleAnswer(playerIndex, option) {
    if (option === current.answer) {
      setWinnerIndex(playerIndex);
      setPhase("reward");
    } else {
      const newLocked = [...lockedOut, playerIndex];
      setLockedOut(newLocked);
      // Both wrong: nobody wins, move on
      if (newLocked.length === 2) nextQuestion();
    }
  }

  function collectMystery() {
    const item = rollCollectible();
    const newPlayers = players.map((p, i) =>
      i === winnerIndex ? { ...p, collection: [...p.collection, item] } : p
    );
    updatePlayers(newPlayers);
    setReveal({ item, stolen: false });
    setPhase("reveal");
  }

  function stealItem(itemIndex) {
    const item = players[loserIndex].collection[itemIndex];
    const newPlayers = players.map((p, i) => {
      if (i === winnerIndex) return { ...p, collection: [...p.collection, item] };
      if (i === loserIndex) return { ...p, collection: p.collection.filter((_, j) => j !== itemIndex) };
      return p;
    });
    updatePlayers(newPlayers);
    setReveal({ item, stolen: true });
    setPhase("reveal");
  }

  function nextQuestion() {
    setQuestionIndex((questionIndex + 1) % questions.length);
    setLockedOut([]);
    setWinnerIndex(null);
    setReveal(null);
    setPhase("question");
  }

  if (phase === "start") return <StartScreen onStart={startGame} />;

  return (
    <div className="app">
      {phase === "question" && (
        <>
          <QuestionCard question={current.question} />
          <div className="players">
            {players.map((player, i) => (
              <PlayerPanel
                key={i}
                player={player}
                options={current.options}
                locked={lockedOut.includes(i)}
                onAnswer={(option) => handleAnswer(i, option)}
              />
            ))}
          </div>
        </>
      )}

      {phase === "reward" && (
        <RewardScreen
          winner={players[winnerIndex]}
          loser={players[loserIndex]}
          onCollect={collectMystery}
          onSteal={() => setPhase("steal")}
        />
      )}

      {phase === "steal" && (
        <StealScreen winner={players[winnerIndex]} loser={players[loserIndex]} onSteal={stealItem} />
      )}

      {phase === "reveal" && (
        <RevealScreen
          playerName={players[winnerIndex].name}
          item={reveal.item}
          stolen={reveal.stolen}
          onNext={nextQuestion}
        />
      )}

      <div className="collections">
        {players.map((player, i) => (
          <div key={i} className="collection">
            <h3>{player.name}'s collection</h3>
            <div className="collection-grid small">
              {player.collection.map((item, j) => (
                <CollectibleCard key={j} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
