import React from "react";
import { Box, Typography } from "@mui/material";

const SectionHeader = ({
  title,
  subtitle,
  sx, // Custom styles agar bahar se pass karne ho
}) => {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      {/* Main Title (e.g., Transaction History) */}
      <Typography variant="h1" component="h2">
        {title}
      </Typography>

      {/* Subtitle (e.g., Track every transaction...) */}
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: "#6B7280", // Soft gray text
            mt: 0.5,
            fontWeight: 400,
            fontSize: "1rem",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
