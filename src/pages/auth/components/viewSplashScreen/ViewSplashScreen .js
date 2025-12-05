import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { boxTop, ViewSplashScreenIcone } from "../../../../assets/images";

const ViewSplashScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#013EB7",
        backgroundImage: `url(${boxTop})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        position: "relative",
        p: 4,
      }}
    >
      <Box sx={{ width: "80%", maxWidth: "400px", mb: 4 }}>
        <img
          src={ViewSplashScreenIcone}
          alt="Hero"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* Text Section */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ textAlign: "center", color: "#fff",mb:1 }}>
          Welcome To Bank POC
        </Typography>
        <Typography
          variant="body1"
          sx={{
            opacity: 0.8,
            maxWidth: "400px",
            margin: "0 auto",
            color: "#fff",
          }}
        >
          Welcome to Bank POS — let's get you started quickly and smoothly
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewSplashScreen;
