"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  const router = useRouter();

  const startGame = () => {
    router.push("/puzzle1"); // Navigate to the first puzzle
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
        Anniversary Escape Room
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#8b0000", // Darker red for contrast
          marginBottom: 3,
        }}
      >
        Can you escape in time?
      </Typography>
      <Button
        variant="contained"
        onClick={startGame}
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
        Start
      </Button>
    </Box>
  );
}