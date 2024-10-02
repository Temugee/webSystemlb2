import React from "react";

export default function Fruit({ fruit, toggleFruit }) {
  function handleFruitClick() {
    toggleFruit(fruit.id);
  }

  return (
    <div style={styles.fruitItem}>
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={fruit.complete}
          onChange={handleFruitClick}
          style={styles.checkbox}
        />
        <span style={fruit.complete ? styles.completedFruit : styles.fruitName}>
          {fruit.name}
        </span>
      </label>
    </div>
  );
}

const styles = {
  fruitItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  label: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem",
  },
  checkbox: {
    marginRight: "10px",
    width: "20px",
    height: "20px",
  },
  fruitName: {
    color: "#333",
  },
  completedFruit: {
    color: "#999",
    textDecoration: "line-through",
  },
};
