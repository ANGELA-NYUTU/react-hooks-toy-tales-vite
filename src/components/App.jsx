import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3000/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ======================
  // GET TOYS
  // ======================
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function toggleForm() {
    setShowForm((prev) => !prev);
  }

  // ======================
  // CREATE TOY (POST)
  // ======================
  function addToy(newToy) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newToy, likes: 0 }),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        setToys((prev) => [...prev, createdToy]);
      });
  }

  // ======================
  // ❤️ LIKE FEATURE (PATCH)
  // ======================
  function handleLikeToy(toy) {
    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      });
  }

  // ======================
  // 🗑️ DONATE FEATURE (DELETE)
  // ======================
  function handleDonateToy(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((toy) => toy.id !== id));
    });
  }

  return (
    <>
      <Header />

      <div className="buttonContainer">
        <button onClick={toggleForm}>Add a Toy</button>
      </div>

      {showForm && <ToyForm addToy={addToy} />}

      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDonateToy={handleDonateToy}
      />
    </>
  );
}

export default App;