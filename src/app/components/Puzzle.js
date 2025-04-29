import { useState } from "react";
import styles from "./Puzzle.module.css";

export default function Puzzle({ title, question, correctAnswer, onSolve }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage("Correct! Moving to the next puzzle...");
      onSolve();
    } else {
      setMessage("Incorrect. Try again!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.question}>{question}</p>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your answer"
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}