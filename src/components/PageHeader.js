import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { headerright } from "../assets/images";

const PageHeader = ({
  title,
  description,
  bgImage = headerright, // Default image set kar sakte hain
  sx = {}, // Custom styles override karne ke liye
}) => {
  return (
    <Box
      sx={{
        color: "white",
        // py: 6,
        // px: { xs: 2, md: 10 },
        minHeight: "130px",
        mb: 2,
        backgroundColor: "#013EB7",
        backgroundImage: `url(${bgImage})`, // Dynamic Image
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        backgroundSize: "contain", // Image ko proper fit karne ke liye
        ...sx, // Extra styles agar pass karne hon
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ color: "#fff",mb:'1px' }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ opacity: 0.9, maxWidth: 600, color: "#fff" }}
        >
          {description}
        </Typography>
      </Container>
    </Box>
  );
};

export default PageHeader;
