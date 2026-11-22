function CollectibleCard({ item, onClick }) {
  return (
    <button className={`collectible ${item.rarity}`} onClick={onClick} disabled={!onClick}>
      <span className="collectible-emoji">{item.emoji}</span>
      <span className="collectible-name">{item.name}</span>
      <span className="collectible-rarity">{item.rarity}</span>
    </button>
  );
}

export default CollectibleCard;
