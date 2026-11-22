import { useState } from "react";
import sampleQuestions from "../data/questions";
import { rollCollectible } from "../utils/drop";
import QuestionCard from "./QuestionCard";
import PlayerPanel from "./PlayerPanel";
import RewardScreen from "./RewardScreen";
import StealScreen from "./StealScreen";
import RevealScreen from "./RevealScreen";
import CollectibleCard from "./CollectibleCard";

function Battle({ classData, playerIds, onUpdateClass, onExit }) {
  // "question" | "reward" | "steal" | "reveal"
  const [phase, setPhase] = useState("question");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lockedOut, setLockedOut] = useState([]);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [reveal, setReveal] = useState(null);

  // Students are stored in the class, so we always read the latest version from there
  const players = playerIds.map((id) => classData.students.find((s) => s.id === id));
  const questions = classData.questions.length > 0 ? classData.questions : sampleQuestions;
  const current = questions[questionIndex];
  const loserIndex = winnerIndex === 0 ? 1 : 0;

  // Replace the changed students inside the class and save
  function saveStudents(changed) {
    const students = classData.students.map((s) => changed.find((c) => c.id === s.id) || s);
    onUpdateClass({ ...classData, students });
  }

  function handleAnswer(playerIndex, option) {
    if (option === current.answer) {
      const winner = players[playerIndex];
      saveStudents([{ ...winner, wins: winner.wins + 1 }]);
      setWinnerIndex(playerIndex);
      setPhase("reward");
    } else {
      const newLocked = [...lockedOut, playerIndex];
      setLockedOut(newLocked);
      if (newLocked.length === 2) nextQuestion(); // both wrong, nobody wins
    }
  }

  function collectMystery() {
    const item = rollCollectible();
    const winner = players[winnerIndex];
    saveStudents([{ ...winner, collection: [...winner.collection, item] }]);
    setReveal({ item, stolen: false });
    setPhase("reveal");
  }

  function stealItem(itemIndex) {
    const winner = players[winnerIndex];
    const loser = players[loserIndex];
    const item = loser.collection[itemIndex];
    saveStudents([
      { ...winner, collection: [...winner.collection, item] },
      { ...loser, collection: loser.collection.filter((_, j) => j !== itemIndex) },
    ]);
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

  return (
    <div className="app">
      <button className="link-button" onClick={onExit}>
        ← End battle
      </button>

      {phase === "question" && (
        <>
          <p className="hint">
            Question {questionIndex + 1} of {questions.length}
          </p>
          <QuestionCard question={current.question} />
          <div className="players">
            {players.map((player, i) => (
              <PlayerPanel
                key={player.id}
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
        {players.map((player) => (
          <div key={player.id} className="collection">
            <h3>
              {player.avatar} {player.name}'s collection
            </h3>
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

export default Battle;
