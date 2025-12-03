import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PoRPage() {
  const mockSnapshot = {
    id: 55,
    timestamp: "2025-10-27 14:30:00",
    root: "0x7f83b...a92",
    status: "Verified",
  };

  return (
    <Box maxWidth="md">
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Proof of Reserves
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader title="Zenith Chain Verification" />
        <CardContent>
          <Stack spacing={2}>
            <Paper
              sx={{
                p: 2,
                bgcolor: "success.light",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography fontWeight="bold" color="success.dark">
                    100% Backed
                  </Typography>
                  <Typography variant="caption" color="success.dark">
                    Zenith Supply == Fiat Reserves
                  </Typography>
                </Box>
              </Stack>
              <Box textAlign="right">
                <Typography variant="caption" display="block">
                  Last Snapshot
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  #{mockSnapshot.id}
                </Typography>
              </Box>
            </Paper>

            <Paper
              sx={{
                p: 2,
                bgcolor: "grey.900",
                color: "grey.300",
                fontFamily: "monospace",
                fontSize: 12,
              }}
            >
              <span style={{ color: "#64748b" }}>
                // Merkle Root Anchored on Catena
              </span>
              <br />
              {mockSnapshot.root}
            </Paper>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
