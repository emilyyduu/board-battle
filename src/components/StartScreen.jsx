import { useState } from "react";

function StartScreen({ onStart }) {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const ready = nameA.trim() && nameB.trim();

  return (
    <div className="start-screen">
      <h1>⚔️ Board Battle</h1>
      <p>Answer first to win the round, then collect or steal a creature!</p>
      <div className="name-inputs">
        <input placeholder="Player 1 name" value={nameA} onChange={(e) => setNameA(e.target.value)} />
        <input placeholder="Player 2 name" value={nameB} onChange={(e) => setNameB(e.target.value)} />
      </div>
      <button className="next-button" disabled={!ready} onClick={() => onStart(nameA.trim(), nameB.trim())}>
        Start battle
      </button>
    </div>
  );
}

export default StartScreen;
