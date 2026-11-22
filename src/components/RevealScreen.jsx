import CollectibleCard from "./CollectibleCard";

function RevealScreen({ playerName, item, stolen, onNext }) {
  return (
    <div className="reward-screen reveal">
      <h2>
        {playerName} {stolen ? "stole" : "got"}...
      </h2>
      <div className="reveal-card">
        <CollectibleCard item={item} />
      </div>
      <button className="next-button" onClick={onNext}>
        Next question →
      </button>
    </div>
  );
}

export default RevealScreen;
