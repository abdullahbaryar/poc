import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Container,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Fallback icon

const Navbar = ({
  title = "Bank Poc",
  logoUrl, // Agar custom logo image hai to yahan pass karein
  userAvatar = "https://i.pravatar.cc/150?img=68", // Default avatar for demo
}) => {
  return (
    <AppBar
      position="static"
      elevation={0} // Flat look, shadow hatane ke liye
      sx={{
        bgcolor: "#0033a1", // Exact dark blue color matching the image
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle separator if needed
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 64, md: 70 },
          }}
        >
          {/* Left Side: Logo & Brand Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Logo Circle */}
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  style={{ width: "24px", height: "24px" }}
                />
              ) : (
                // Agar logo nahi hai to yeh icon dikhega (Blue color ka)
                <AccountBalanceIcon sx={{ color: "#0033a1", fontSize: 24 }} />
              )}
            </Box>

            {/* Brand Text */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: "white",
                letterSpacing: ".05rem",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Right Side: User Profile */}
          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt="User Name"
              src={userAvatar}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid rgba(255, 255, 255, 0.5)", // Avatar ke gard halka white border
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                  borderColor: "#fff",
                },
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
