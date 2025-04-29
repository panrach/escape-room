"use client";
import { Box, Typography, Button, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Puzzle({
  title,
  poem,
  question,
  image,
  correctLocation,
  radius,
  onSolve,
}) {
  const [message, setMessage] = useState("");
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  const handleSolve = async () => {
    setIsCheckingLocation(true);

    // Set a fallback to mark as correct after 5 seconds
    const fallbackTimeout = setTimeout(() => {
      setMessage("Correct! Moving to the next puzzle...");
      setTimeout(onSolve, 2000); // Navigate to the next puzzle
      setIsCheckingLocation(false);
    }, 5000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(fallbackTimeout);

          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            correctLocation.lat,
            correctLocation.lng
          );

          if (distance <= radius) {
            setMessage("Correct! Moving to the next puzzle...");
            setTimeout(onSolve, 2000);
          } else {
            setMessage("You are not at the correct location!");
          }

          setIsCheckingLocation(false);
        },
        () => {
          clearTimeout(fallbackTimeout);
          setMessage("Correct! Moving to the next puzzle...");
          setTimeout(onSolve, 2000);
          setIsCheckingLocation(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      clearTimeout(fallbackTimeout);
      setMessage("Correct! Moving to the next puzzle...");
      setTimeout(onSolve, 2000);
      setIsCheckingLocation(false);
    }
  };

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

  // Generate an array of hearts for the rainfall effect
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // Random horizontal position
    delay: Math.random() * 5, // Random delay for staggered animation
  }));

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hearts Rainfall */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "110%", opacity: 1 }}
          transition={{
            duration: 4,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: `${heart.left}%`,
            fontSize: "2rem",
            color: "#ff69b4",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {image && (
        <Box
          component="img"
          src={image}
          alt="Puzzle Image"
          sx={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "10px",
            marginBottom: 3,
          }}
        />
      )}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#b22222",
          marginBottom: 2,
        }}
      >
        {title}
      </Typography>
      {Array.isArray(poem) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            background: "linear-gradient(135deg, #fff8dc, #f5deb3)",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
            marginBottom: "20px",
            maxWidth: "600px",
            border: "2px solid #d2b48c",
          }}
        >
          {poem.map((line, index) => (
            <Typography
              key={index}
              variant="h5"
              sx={{
                fontFamily: "cursive",
                color: "#8b0000",
                marginBottom: 2,
                fontStyle: "italic",
                textIndent: "1em",
                marginLeft: "-1em", // Shift the text slightly to the left
              }}
            >
              {line}
            </Typography>
          ))}
        </motion.div>
      )}
      <Typography
        variant="h6"
        sx={{
          color: "#8b0000",
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
          backgroundColor: "#ff69b4",
          color: "#fff",
          fontWeight: "bold",
          padding: "10px 20px",
          fontSize: "1.2rem",
          "&:hover": {
            backgroundColor: "#ff1493",
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