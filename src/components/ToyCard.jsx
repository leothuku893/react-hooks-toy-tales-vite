function ToyCard({ toy, onUpdateLikes, onDeleteToy }) {
  const handleLike = () => {
    onUpdateLikes(toy.id, toy.likes);
  };

  const handleDonate = () => {
    onDeleteToy(toy.id);
  };

  return (
    <div className="toy-card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button onClick={handleLike} className="like-btn">
        Like {'<3'}
      </button>
      <button onClick={handleDonate} className="donate-btn">
        Donate to GoodWill 
      </button>
    </div>
  );
}

export default ToyCard;