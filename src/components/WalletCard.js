import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Container,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const WalletCard = ({
  balance = "10,000,000",
  currency = "SKRW",
  address = "0xf1da98dd2716a243487f334345",
  onSettle,
  onReceive,
  onSend,
}) => {
  const [copied, setCopied] = useState(false);

  const displayAddress = address
    ? `${address.substring(0, 10)}...${address.substring(address.length - 10)}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Common styling for the light buttons (Settle & Receive)
  const lightButtonStyle = {
    minWidth: "130px",
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2 },
          borderRadius: "15px", // Extra rounded container
          bgcolor: "#fff",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          margin: "0 auto",
          // Very soft drop shadow like the image
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Left Side: Balance & Info */}
        <Box sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="body1" sx={{ color: "#6b7280", mb: 0.3 }}>
            Total Balance
          </Typography>

          {/* Currency & Balance */}
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{ mb: 1 }}
          >
            {/* Note: Image shows SKRW prominently in blue */}
            <Typography
              variant="h2"
              //   fontWeight="bold"
              sx={{ color: "#0B409C", fontFamily: "Poppins-Bold" }}
            >
              {currency}
            </Typography>
            {/* If you want to show amount, uncomment below */}
            <Typography variant="h2" sx={{ fontFamily: "Poppins-Bold" }}>
              {balance}
            </Typography>
          </Stack>

          {/* Address Row */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Typography variant="body2" fontWeight="600" color="text.primary">
              Address:
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              {displayAddress}
            </Typography>

            <Tooltip title={copied ? "Copied!" : "Copy Address"}>
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyIcon sx={{ fontSize: 18, color: "#6b7280" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Right Side: Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <Button variant="outlined" onClick={onSettle} sx={lightButtonStyle}>
            Settle Funds
          </Button>

          <Button variant="outlined" onClick={onReceive} sx={lightButtonStyle}>
            Receive
          </Button>

          <Button variant="contained" onClick={onSend} sx={lightButtonStyle}>
            Send
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default WalletCard;
