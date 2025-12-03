import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Stack,
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { issueCurrency } from "../../store/slices/ledgerSlice";
import toast from "react-hot-toast";

// Icons
import UploadIcon from "@mui/icons-material/CloudUpload";

export default function IssuancePage() {
  const [amount, setAmount] = useState(50000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(null); // 'deposit' | 'zenith' | 'icp'

  const dispatch = useDispatch();

  const handleIssuance = () => {
    if (!amount || amount <= 0) return toast.error("Enter a valid amount");

    setIsProcessing(true);

    // Visual Simulation Sequence
    setProcessStep("deposit");
    setTimeout(() => {
      setProcessStep("zenith");
      setTimeout(() => {
        setProcessStep("icp");
        setTimeout(() => {
          // Final Action: Update Redux State
          dispatch(issueCurrency(Number(amount)));
          toast.success(`Issued ₩${Number(amount).toLocaleString()} sKRW`);

          // Reset
          setIsProcessing(false);
          setProcessStep(null);
          setAmount(0);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <Box maxWidth="md" sx={{ mx: "auto" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Asset Issuance
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          title="Mint sKRW"
          subheader="Authorize Fiat Deposit & Mint On-Chain"
        />
        <CardContent>
          <Stack spacing={4}>
            <Alert severity="info">
              Only <strong>Administrators</strong> can mint. This triggers a
              Fiat Lock → Zenith Mint → Catena Mirror.
            </Alert>

            <TextField
              label="Deposit Amount (KRW)"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Lifecycle Visualizer */}
            <Paper variant="outlined" sx={{ p: 3, bgcolor: "grey.50" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {/* Step 1 */}
                <StepItem
                  step={1}
                  label="Fiat Deposit"
                  active={processStep === "deposit"}
                />

                <Divider sx={{ flex: 1, mx: 2 }} />

                {/* Step 2 */}
                <StepItem
                  step={2}
                  label="Zenith Mint"
                  active={processStep === "zenith"}
                />

                <Divider sx={{ flex: 1, mx: 2 }} />

                {/* Step 3 */}
                <StepItem
                  step={3}
                  label="Catena Mirror"
                  active={processStep === "icp"}
                />
              </Stack>
            </Paper>

            <Button
              variant="contained"
              size="large"
              onClick={handleIssuance}
              disabled={isProcessing}
              startIcon={<UploadIcon />}
            >
              {isProcessing ? "Executing Lifecycle..." : "Mint & Distribute"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

// Helper Sub-component for visual steps
const StepItem = ({ step, label, active }) => (
  <Stack
    alignItems="center"
    sx={{
      opacity: active ? 1 : 0.5,
      transform: active ? "scale(1.1)" : "scale(1)",
      transition: "0.3s",
    }}
  >
    <Avatar sx={{ bgcolor: active ? "primary.main" : "grey.400", mb: 1 }}>
      {step}
    </Avatar>
    <Typography variant="caption" fontWeight={active ? "bold" : "normal"}>
      {label}
    </Typography>
  </Stack>
);
