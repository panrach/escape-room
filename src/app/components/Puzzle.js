"use client";
import { Box, Typography, Button, Alert } from "@mui/material";
import { useState } from "react";

export default function Puzzle({ title, question, correctLocation, radius, onSolve }) {
  const [message, setMessage] = useState("");
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  const handleSolve = async () => {
    setIsCheckingLocation(true);

    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Check if the user's location is within the radius
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            correctLocation.lat,
            correctLocation.lng
          );

          if (distance <= radius) {
            setMessage("Correct! Moving to the next puzzle...");
            setTimeout(onSolve, 2000); // Navigate to the next puzzle
          } else {
            setMessage("You are not at the correct location!");
          }

          setIsCheckingLocation(false);
        },
        () => {
          setMessage("Unable to get your location. Please try again.");
          setIsCheckingLocation(false);
        }
      );
    } else {
      setMessage("Geolocation is not supported by your browser.");
      setIsCheckingLocation(false);
    }
  };

  // Function to calculate the distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ffe4e1", // Light pink background
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#b22222", // Romantic red
          marginBottom: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#8b0000", // Darker red for contrast
          marginBottom: 3,
        }}
      >
        {question}
      </Typography>
      <Button
        variant="contained"
        onClick={handleSolve}
        disabled={isCheckingLocation}
        sx={{
          backgroundColor: "#ff69b4", // Hot pink
          color: "#fff",
          fontWeight: "bold",
          padding: "10px 20px",
          fontSize: "1.2rem",
          "&:hover": {
            backgroundColor: "#ff1493", // Deep pink on hover
          },
        }}
      >
        {isCheckingLocation ? "Checking Location..." : "Check Location"}
      </Button>
      {message && (
        <Alert
          severity={message.includes("Correct") ? "success" : "error"}
          sx={{
            marginTop: 3,
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {message}
        </Alert>
      )}
    </Box>
  );
}