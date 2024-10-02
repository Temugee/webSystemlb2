import React, { useState, useRef, useEffect } from "react";
import FruitList from "./FruitList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "fruitApp.fruits";

function App() {
  const [fruits, setFruits] = useState([]);
  const fruitNameRef = useRef();

  useEffect(() => {
    const storedFruits = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFruits) {
      try {
        const parsedFruits = JSON.parse(storedFruits);
        setFruits(parsedFruits);
        console.log(
          "Successfully retrieved fruits from localStorage:",
          parsedFruits
        );
      } catch (error) {
        console.error("Error parsing stored fruits:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (fruits.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fruits));
      console.log("Fruits saved to localStorage:", fruits);
    }
  }, [fruits]);

  function toggleFruit(id) {
    const newFruits = [...fruits];
    const fruit = newFruits.find((fruit) => fruit.id === id);
    fruit.complete = !fruit.complete;
    setFruits(newFruits);
  }

  function handleAddFruits() {
    const name = fruitNameRef.current.value;
    if (name === "") return;
    setFruits((prevFruits) => {
      return [...prevFruits, { id: uuidv4(), name: name, complete: false }];
    });
    fruitNameRef.current.value = null;
  }

  function handleClearFruits() {
    const newFruits = fruits.filter((fruit) => !fruit.complete);
    setFruits(newFruits);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Жагсаалт</h1>
      <FruitList fruits={fruits} toggleFruit={toggleFruit} />
      <div style={styles.inputContainer}>
        <input
          ref={fruitNameRef}
          type="text"
          placeholder="Та утгаа оруулна уу..."
          style={styles.input}
        />
        <button onClick={handleAddFruits} style={styles.button}>
          Жагсаалт нэмэх
        </button>
        <button onClick={handleClearFruits} style={styles.button}>
          Арилгах
        </button>
      </div>
      <div style={styles.counter}>
        {fruits.filter((fruit) => !fruit.complete).length} -ийг нэмсэн
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f7f9fc",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#4A90E2",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
    flex: "1",
    maxWidth: "300px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4A90E2",
    color: "#fff",
    cursor: "pointer",
    marginRight: "10px",
  },
  counter: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default App;
