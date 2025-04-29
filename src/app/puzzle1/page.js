"use client";
import { useRouter } from "next/navigation";
import Puzzle from "../components/Puzzle";

export default function Puzzle1() {
  const router = useRouter();

  const handleSolve = () => {
    router.push("/puzzle2");
  };

  return (
    <Puzzle
      title="Puzzle 1"
      question="What is 5 + 3?"
      correctAnswer="8"
      onSolve={handleSolve}
    />
  );
}