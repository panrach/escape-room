"use client";
import { useRouter } from "next/navigation";
import Puzzle from "../components/Puzzle";

export default function Puzzle1() {
  const router = useRouter();

  const handleSolve = () => {
    router.push("/puzzle2"); // Navigate to the next puzzle
  };

  return (
    <Puzzle
      title="Puzzle 1"
      question="Where did we first meet?"
      correctLocation={{ lat: 45.2255345104222, lng: -75.6949918027208 }} // Latitude and longitude for the Empire State Building
      radius={500} 
      onSolve={handleSolve}
    />
  );
}