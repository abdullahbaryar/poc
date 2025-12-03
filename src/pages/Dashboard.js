import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// Icons
import StorageIcon from "@mui/icons-material/Storage";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StoreIcon from "@mui/icons-material/Store";

// Component
import NetworkTopology from "../components/dashboard/NetworkTopology";

// --- STYLED STAT CARD ---
const StatCard = ({ title, value, icon, color = "primary" }) => (
  <Card
    sx={{
      height: "100%",
      width: "100%",
      boxShadow: 0,
      borderRadius: 2,
    }}
  >
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Avatar
          variant="rounded"
          sx={{
            width: 48,
            height: 48,
            bgcolor: (theme) => alpha(theme.palette[color].main, 0.12),
            color: (theme) => theme.palette[color].main,
          }}
        >
          {icon}
        </Avatar>

        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { role, name } = useSelector((state) => state.auth.user || {});
  const ledger = useSelector((state) => state.ledger);

  return (
    <Box sx={{ width: "100%", pb: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Hi, {name?.split(" ")[0]} 👋
      </Typography>

      <Stack spacing={4}>
        {/* === SECTION 1: TOP STATS (CSS GRID MAGIC) === */}
        {/* MUI Grid component hataya. Simple CSS Grid use kiya hai. */}
        <Box
          sx={{
            display: "grid",
            // Mobile pe 1 column, Desktop pe 3 barabar columns
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 3, // 24px gap
            width: "100%",
          }}
        >
          {/* Card 1: Always Visible */}
          <StatCard
            title="Zenith Block Height"
            value={`#${ledger.blockHeightZenith}`}
            icon={<StorageIcon />}
            color="info"
          />

          {/* Admin Cards */}
          {role === "admin" && (
            <>
              <StatCard
                title="Fiat Reserves"
                value={`₩ ${ledger.fiatReserves.toLocaleString()}`}
                icon={<MonetizationOnIcon />}
                color="success"
              />
              <StatCard
                title="Total Supply"
                value={`₩ ${ledger.zenithSupply.toLocaleString()}`}
                icon={<StorageIcon />}
                color="warning"
              />
            </>
          )}

          {/* User Cards */}
          {role === "user" && (
            <StatCard
              title="My Balance"
              value={`₩ ${ledger.userBalance.toLocaleString()}`}
              icon={<AccountBalanceWalletIcon />}
              color="primary"
            />
          )}

          {/* Merchant Cards */}
          {role === "merchant" && (
            <StatCard
              title="Pending Settlement"
              value={`₩ ${ledger.merchantBalance.toLocaleString()}`}
              icon={<StoreIcon />}
              color="warning"
            />
          )}
        </Box>

        {/* === SECTION 2: NETWORK TOPOLOGY === */}
        {(role === "admin" || role === "regulator") && (
          <Box sx={{ width: "100%" }}>
            <NetworkTopology />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
