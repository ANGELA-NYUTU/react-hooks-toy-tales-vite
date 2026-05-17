import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      <p>{toy.likes} Likes </p>

      <button onClick={() => onLike(toy)}>
        Like &lt;3
      </button>

      <button onClick={() => onDelete(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;