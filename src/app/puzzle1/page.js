"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Puzzle from "../components/Puzzle";

export default function Puzzle1() {
  const router = useRouter();

  const [userLocation, setUserLocation] = useState(null);

  // for testing (just set the location to the correct one)
  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSolve = () => {
    router.push("/puzzle2");
  };

  return (
    <Puzzle
      title="Chapter 1: The Beginning"
      poem={[
        "In 2023, we had our first chat.",
        "The relationship blossomed, between Rachel & Matt.",
      ]}      
      question="Can you find the place where we first met?"
      // correctLocation={userLocation}
      correctLocation={{ lat: 43.651007, lng: -79.376625 }}
      radius={500}
      onSolve={handleSolve}
    />
  );
}