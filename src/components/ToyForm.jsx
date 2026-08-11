import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      name: name,
      image: image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((toy) => {
        onAddToy(toy);
        setName("");
        setImage("");
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>

        <input
          className="input-text"
          name="name"
          placeholder="Enter a toy's name..."
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <br />

        <input
          className="input-text"
          name="image"
          placeholder="Enter a toy's image URL..."
          type="text"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <br />

        <input
          className="submit"
          name="submit"
          type="submit"
          value="Create New Toy"
        />
      </form>
    </div>
  );
}

export default ToyForm;