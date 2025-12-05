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
  Menu,
  MenuItem,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import arrow icon

const WalletCard = ({
  balance = "10,000,000",
  // currency prop hata kar hum internal state use karenge taake change ho sake
  address = "0xf1da98dd2716a243487f334345",
  onSettle,
  onDeposit,
  onReceive,
  onSend,
}) => {
  const [copied, setCopied] = useState(false);

  // --- Dropdown/Select Logic Starts Here ---
  // Ye wo list hai jo dropdown me show hogi
  const currencyOptions = ["sKRW", "sUSD", "sEUR", "sJPY"];

  // Default pehla select hoga (currencyOptions[0])
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);

  // Menu open/close control karne ke liye state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickCurrency = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
    handleCloseMenu();
  };
  // --- Dropdown/Select Logic Ends Here ---

  const displayAddress = address
    ? `${address.substring(0, 10)}...${address.substring(address.length - 10)}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lightButtonStyle = {
    minWidth: "130px",
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2 },
          borderRadius: "15px",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          margin: "0 auto",
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
            alignItems="center" // Align items center specifically for the arrow
            spacing={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{ mb: 1 }}
          >
            <Typography variant="h2" sx={{ fontFamily: "Poppins-Bold" }}>
              {balance}
            </Typography>

            {/* Clickable Currency Trigger */}
            <Stack
              direction="row"
              alignItems="center"
              onClick={handleClickCurrency}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 }, // Optional hover effect
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "#0B409C",
                  fontFamily: "Poppins-Bold",
                  // fontWeight: "bold" // Agar Poppins-Bold load nahi ho raha to ise uncomment karein
                }}
              >
                {selectedCurrency}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  color: "#0B409C",
                  // fontSize: "2.5rem", // Text ke size ke hisaab se adjust karein
                  ml: -0.5, // Thoda close karne ke liye text ke
                }}
              />
            </Stack>

            {/* Dropdown Menu Component */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "currency-button",
              }}
              PaperProps={{
                sx: {
                  mt: 1, // Thoda gap button aur menu ke beech
                  minWidth: 120,
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              {currencyOptions.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => handleSelectCurrency(option)}
                  selected={option === selectedCurrency}
                  sx={{ fontFamily: "Poppins-Bold", color: "#0B409C" }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
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
        
          <Button variant="outlined" onClick={onDeposit} sx={lightButtonStyle}>
            Deposit
          </Button>
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
