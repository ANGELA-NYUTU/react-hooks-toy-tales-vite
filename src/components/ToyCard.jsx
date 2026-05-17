import React from "react";

function ToyCard({ toy, onLikeToy, onDonateToy }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img src={toy.image} alt={toy.name} />

      <p>{toy.likes} Likes </p>

      {/* ❤️ LIKE FEATURE */}
      <button onClick={() => onLikeToy(toy)}>
        Like &lt;3
      </button>

      {/* 🗑️ DONATE FEATURE */}
      <button onClick={() => onDonateToy(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;