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
    router.push("/puzzle3");
  };

  return (
    <Puzzle
      title="Chapter 2: Adventures Await"
      poem={["We've watched pianists and musicals, orchestras too.",
      "From the stage to the seats, our love only grew.",
      "Today's performance is totally new.",
      "At the Four Seasons, we'll have a nice view",
      "Of a beautiful dance, just me and you."]}
      question="Can you find our next activity?"
      correctLocation={userLocation}
      // correctLocation={{ lat:  43.65031268330466, lng: -79.38607533247138 }}
      radius={500}
      onSolve={handleSolve}
    />
  );
}