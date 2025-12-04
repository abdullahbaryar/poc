import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Aap apni image yahan import karein
// import HeroImage from "../../assets/hero-image.png";

const ViewSplashScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#0047AB", // Screenshot wala Blue color
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        position: "relative",
        p: 4,
      }}
    >
      {/* Top Left Logo (Optional) */}
      <Box
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 30,
          left: 30,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {/* Yahan Logo lagayen */}
        LOGO
      </Box>

      {/* Main Illustration Image */}
      <Box sx={{ width: "80%", maxWidth: "400px", mb: 4 }}>
        {/* Image source yahan lagayein */}
        <img
          src="https://via.placeholder.com/400x300?text=Illustration"
          alt="Hero"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* Text Section */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome To Bank POC
        </Typography>
        <Typography
          variant="body1"
          sx={{ opacity: 0.8, maxWidth: "400px", margin: "0 auto" }}
        >
          Welcome to Bank POS — let's get you started quickly and smoothly
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewSplashScreen;
