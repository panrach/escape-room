"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const startGame = () => {
    router.push("/puzzle1"); // Navigate to the first puzzle
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Anniversary Escape Room</h1>
      <p className={styles.description}>
        Can you escape in time?
      </p>
      <button className={styles.startButton} onClick={startGame}>
        Start 
      </button>
    </div>
  );
}