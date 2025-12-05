import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/layouts/Navbar";
import palette from "../theme/palette";

const UserLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: palette.common.white,
      }}
    >
      <CssBaseline />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      {/* Navbar ke neeche content render hoga */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        //   p: { xs: 2, md: 3 },
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
