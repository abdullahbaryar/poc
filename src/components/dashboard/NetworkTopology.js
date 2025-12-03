import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  Typography,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Storage as ServerIcon,
  Public as GlobeIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function NetworkTopology() {
  const { blockHeightZenith, blockHeightCatena } = useSelector(
    (state) => state.ledger
  );

  return (
    <Card sx={{ borderRadius: 3, height: "100%", width: "100%" }}>
      <CardHeader
        title="Network Topology"
        subheader="Real-time Chain Synchronization"
      />
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between" // Space around hata kar between kiya taaki corners fix rahein
          spacing={2}
          sx={{
            p: 3,
            bgcolor: "background.default",
            borderRadius: 2,
            border: "1px dashed #e0e0e0",
          }}
        >
          {/* ✅ FIX 1: Fixed Width on Left Node (150px) */}
          <Box sx={{ width: 150, textAlign: "center", flexShrink: 0 }}>
            <Avatar
              sx={{
                bgcolor: "primary.light",
                width: 56,
                height: 56,
                mx: "auto",
                mb: 1,
              }}
            >
              <ServerIcon fontSize="large" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="bold">
              Zenith (L1)
            </Typography>
            {/* ✅ FIX 2: Monospace Font taaki numbers hilna band karein */}
            <Chip
              label={`Block #${blockHeightZenith}`}
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, fontFamily: "monospace", width: "100%" }}
            />
          </Box>

          {/* Connection Line */}
          <Box sx={{ flexGrow: 1, textAlign: "center", px: 2 }}>
            <Divider>
              <Chip
                icon={<LockIcon fontSize="small" />}
                label="SYNC ACTIVE"
                color="success"
                size="small"
                sx={{ px: 1, fontWeight: "bold" }}
              />
            </Divider>
          </Box>

          {/* ✅ FIX 3: Fixed Width on Right Node (150px) */}
          <Box sx={{ width: 150, textAlign: "center", flexShrink: 0 }}>
            <Avatar
              sx={{
                bgcolor: "secondary.light",
                width: 56,
                height: 56,
                mx: "auto",
                mb: 1,
              }}
            >
              <GlobeIcon fontSize="large" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="bold">
              Catena (L2)
            </Typography>
            <Chip
              label={`Block #${blockHeightCatena}`}
              size="small"
              variant="outlined"
              sx={{ mt: 0.5, fontFamily: "monospace", width: "100%" }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
