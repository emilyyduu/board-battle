function Leaderboard({ students }) {
  const sorted = [...students].sort((a, b) => b.wins - a.wins);

  return (
    <div className="panel leaderboard">
      <h3>🏆 Leaderboard</h3>
      {sorted.length === 0 && <p className="hint">Add students to see the leaderboard.</p>}
      <ol>
        {sorted.map((s) => (
          <li key={s.id}>
            <span>
              {s.avatar} {s.name}
            </span>
            <span>
              {s.wins} wins · 🎒 {s.collection.length}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
