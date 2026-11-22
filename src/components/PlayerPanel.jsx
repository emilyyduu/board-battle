function PlayerPanel({ player, side, options, locked, onAnswer }) {
  return (
    <div className={`player-panel side-${side} ${locked ? "locked" : ""}`}>
      <h2>
        {player.avatar} {player.name}
      </h2>
      <p className="collection-count">
        🏆 {player.wins} wins · 🎒 {player.collection.length} collected
      </p>
      <div className="options">
        {options.map((option) => (
          <button key={option} className="option-button" disabled={locked} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      {locked && <p className="locked-text">Wrong! Locked out this round</p>}
    </div>
  );
}

export default PlayerPanel;
