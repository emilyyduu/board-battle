function RewardScreen({ winner, loser, onCollect, onSteal, onSkip }) {
  const canSteal = loser.collection.length > 0;

  return (
    <div className="reward-screen">
      <h2>🎉 {winner.name} wins the round!</h2>
      <p>Choose your reward:</p>
      <div className="reward-choices">
        <button className="reward-button mystery" onClick={onCollect}>
          🥚 Open a mystery egg
        </button>
        <button className="reward-button steal" onClick={onSteal} disabled={!canSteal}>
          🫳 Steal from {loser.name}
        </button>
      </div>
      {!canSteal && <p className="hint">{loser.name} has nothing to steal yet!</p>}
      {onSkip && (
        <button className="link-button" onClick={onSkip}>
          Skip
        </button>
      )}
    </div>
  );
}

export default RewardScreen;
