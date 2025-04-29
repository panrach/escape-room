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
    router.push("/puzzle4");
  };

  return (
    <Puzzle
      title="Chapter 3: Sharing Meals"
      poem={[
        "We love pizza and pasta, and chinese food.",
        "The food we eat, always puts us in a good mood.",
        "There is one meal I know you always find nice.",
        "How would you feel about a bowl of fried rice?",
      ]}
      question="Where will we eat dinner after the show?"
      correctLocation={userLocation}
      // correctLocation={{ lat: 43.658297989311805, lng: -79.38187066579773}}
      radius={500}
      onSolve={handleSolve}
    />
  );
}
