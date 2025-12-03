import React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/slices/authSlice";

// --- ICONS ---
import {
  Storage as ServerIcon,
  VerifiedUser as ShieldCheckIcon,
  Business as Building2Icon,
  FactCheck as FileCheckIcon,
  Person as UserIcon,
  Store as StoreIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Direct Login (Admin & Regulator)
  const handleLogin = (role) => {
    dispatch(
      loginSuccess({
        name: role === "admin" ? "Bank Admin" : "Regulator",
        role: role,
        walletAddress: `0x${role.toUpperCase()}...ADDRESS`,
      })
    );
    navigate("/");
  };

  // 2. Go to Onboarding (User & Merchant)
  const handleOnboarding = (type) => {
    navigate(`/onboarding?type=${type}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      {/* MAIN CONTAINER BOX (Replaces Grid Container) */}
      <Box
        sx={{
          maxWidth: 1024,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: 24,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }, // Mobile: Top-Down, Desktop: Left-Right
        }}
      >
        {/* === LEFT SIDE: HERO (Blue Section) === */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" }, // Half width on desktop
            bgcolor: "primary.main",
            p: 6,
            color: "white",
          }}
        >
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" mb={4}>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                Z
              </Avatar>
              <Typography variant="h3" fontWeight="bold">
                Zenith{' '}
                <Box component="span" sx={{ color: "#93c5fd" }}>
                  Catena
                </Box>
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Institutional KRW Stablecoin PoC
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#bfdbfe", opacity: 0.9, mt: 2 }}
            >
              Demonstrating the secure lifecycle of sKRW: Issuance, Mirroring,
              Settlement, and Proof-of-Reserves.
            </Typography>
          </Box>

          <Stack spacing={3} mt={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
                <ServerIcon />
              </Avatar>
              <Box>
                <Typography fontWeight="bold">
                  Dual-Chain Architecture
                </Typography>
                <Typography variant="body2" sx={{ color: "#bfdbfe" }}>
                  Zenith (Issuance) + Catena (Distribution)
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
                <ShieldCheckIcon />
              </Avatar>
              <Box>
                <Typography fontWeight="bold">Automated Compliance</Typography>
                <Typography variant="body2" sx={{ color: "#bfdbfe" }}>
                  Integrated KYT & Proof-of-Reserves
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* === RIGHT SIDE: ROLE SELECTION (White Section) === */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" }, // Half width on desktop
            p: 6,
            bgcolor: "#f8fafc",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Select Access Portal
          </Typography>

          <Stack spacing={2} mt={4}>
            {/* ADMIN LOGIN */}
            <RoleCard
              icon={<Building2Icon />}
              title="Bank Administrator"
              subtitle="Access Issuance & Ops"
              color="primary"
              onClick={() => handleLogin("admin")}
            />

            {/* REGULATOR LOGIN */}
            <RoleCard
              icon={<FileCheckIcon />}
              title="Auditor / Regulator"
              subtitle="View Proof-of-Reserves"
              color="default"
              onClick={() => handleLogin("regulator")}
            />

            {/* DIVIDER */}
            <Divider sx={{ my: 2 }}>
              <Chip label="ONBOARDING" size="small" />
            </Divider>

            {/* USER SIGNUP */}
            <RoleCard
              icon={<UserIcon />}
              title="Retail User"
              subtitle="Create Wallet"
              color="success"
              isSignup
              onClick={() => handleOnboarding("user")}
            />

            {/* MERCHANT SIGNUP */}
            <RoleCard
              icon={<StoreIcon />}
              title="Merchant"
              subtitle="Register Store"
              color="success"
              isSignup
              onClick={() => handleOnboarding("merchant")}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

// --- HELPER COMPONENT FOR CARDS ---
const RoleCard = ({ icon, title, subtitle, color, onClick, isSignup }) => (
  <Paper
    elevation={0}
    onClick={onClick}
    sx={{
      p: 2,
      border: "1px solid #e2e8f0",
      borderRadius: 3,
      cursor: "pointer",
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "primary.main",
        transform: "translateY(-2px)",
        boxShadow: 2,
      },
    }}
  >
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        variant="rounded"
        sx={{
          bgcolor:
            color === "success"
              ? "success.light"
              : color === "primary"
              ? "primary.50"
              : "grey.200",
          color:
            color === "success"
              ? "white"
              : color === "primary"
              ? "primary.main"
              : "grey.700",
        }}
      >
        {icon}
      </Avatar>
      <Box flex={1}>
        <Typography fontWeight="bold">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      {isSignup ? (
        <Chip
          label="SIGN UP"
          size="small"
          color="success"
          variant="outlined"
          clickable
        />
      ) : (
        <ChevronRightIcon color="action" />
      )}
    </Stack>
  </Paper>
);
