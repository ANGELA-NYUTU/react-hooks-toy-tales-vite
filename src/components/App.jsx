import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3000/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // =========================
  // GET TOYS ON PAGE LOAD
  // =========================
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // toggle form
  function handleClick() {
    setShowForm((prev) => !prev);
  }

  // =========================
  // CREATE (POST)
  // =========================
  function addToy(toy) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...toy, likes: 0 }),
    })
      .then((res) => res.json())
      .then((newToy) => {
        setToys((prev) => [...prev, newToy]);
      });
  }

  // =========================
  // UPDATE (PATCH - LIKE)
  // =========================
  function likeToy(toy) {
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

  // =========================
  // DELETE (DONATE)
  // =========================
  function deleteToy(id) {
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
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      {showForm && <ToyForm addToy={addToy} />}

      <ToyContainer
        toys={toys}
        onLike={likeToy}
        onDelete={deleteToy}
      />
    </>
  );
}

export default App;