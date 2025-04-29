"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Puzzle from "../components/Puzzle";

export default function Puzzle1() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState(null);

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
    router.push("/conclusion");
  };

  return (
    <Puzzle
      title="Chapter 4: Our Spot"
      poem={[
        "Rain or shine, we'll always be there",
        "To laugh, watch a sunset, or just to stare.",
        "It's where we became official and made memories to share.",
        "The sun is setting my love, let's go to our spot.",
        "And enjoy the view, it's the best one we've got.",
      ]}
      question="Where will we end our date?"
      correctLocation={userLocation}
      // correctLocation={{ lat: 43.637844, lng: -79.380438 }}
      radius={500}
      onSolve={handleSolve}
    />
  );
}
