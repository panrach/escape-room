"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function Conclusion() {
  const handleRestart = () => {
    // Redirect to the first puzzle or home page
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#fff5e1",
        padding: 3,
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#ff4500",
            marginBottom: 2,
          }}
        >
          🎉 Happy Birthday! 🎂
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#ff6347",
            marginBottom: 3,
            fontStyle: "italic",
          }}
        >
          "Happy Birthday my Love!"
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#8b0000", // Deep red for emphasis
            marginBottom: 3,
          }}
        >
          Thank you for playing this escape room with me. You made it to the end!
        </Typography>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <Button
          variant="contained"
          onClick={handleRestart}
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
          Play Again
        </Button>
      </motion.div>
    </Box>
  );
}