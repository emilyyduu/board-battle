import CollectibleCard from "./CollectibleCard";

function StealScreen({ winner, loser, onSteal }) {
  return (
    <div className="reward-screen">
      <h2>🫳 {winner.name}, pick one to steal from {loser.name}!</h2>
      <div className="collection-grid">
        {loser.collection.map((item, index) => (
          <CollectibleCard key={index} item={item} onClick={() => onSteal(index)} />
        ))}
      </div>
    </div>
  );
}

export default StealScreen;
