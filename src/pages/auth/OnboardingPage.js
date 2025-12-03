import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Stack,
  Chip,
  Avatar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import UploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";

export default function OnboardingPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "user"; // 'user' or 'merchant'

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [docUploaded, setDocUploaded] = useState(false);
  const [mnemonicSaved, setMnemonicSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const mnemonic =
    "apple river house card blue market jump train window sleep logic bird";

  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      dispatch(
        loginSuccess({
          name: name,
          role: type,
          walletAddress: type === "user" ? "0x71C...9A2" : "0xMER...B21",
        })
      );
      toast.success("Account Created Successfully!");
      navigate("/");
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card
        sx={{ maxWidth: 500, width: "100%", borderRadius: 3, boxShadow: 3 }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" textTransform="capitalize">
            {type} Onboarding
          </Typography>
          <Chip label={`Step ${step} of 3`} color="primary" size="small" />
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Step 1: Name */}
          {step === 1 && (
            <Stack spacing={3}>
              <Typography variant="body1">
                Enter your details to verify identity.
              </Typography>
              <TextField
                label={type === "user" ? "Full Name" : "Business Name"}
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setStep(2)}
                disabled={!name}
              >
                Continue
              </Button>
            </Stack>
          )}

          {/* Step 2: Upload */}
          {step === 2 && (
            <Stack spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: docUploaded ? "success.light" : "grey.200",
                }}
              >
                <UploadIcon />
              </Avatar>
              <Button
                onClick={() => setDocUploaded(true)}
                variant={docUploaded ? "outlined" : "contained"}
                fullWidth
                disabled={docUploaded}
              >
                {docUploaded ? "Upload Complete" : "Upload ID Document"}
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setStep(3)}
                disabled={!docUploaded}
              >
                Next Step
              </Button>
            </Stack>
          )}

          {/* Step 3: Mnemonic */}
          {step === 3 && (
            <Stack spacing={3}>
              <Alert severity="warning">Save this phrase: {mnemonic}</Alert>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mnemonicSaved}
                    onChange={(e) => setMnemonicSaved(e.target.checked)}
                  />
                }
                label="I have backed up my phrase."
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleFinish}
                disabled={!mnemonicSaved || isProcessing}
              >
                {isProcessing ? "Creating Wallet..." : "Finish"}
              </Button>
            </Stack>
          )}

          <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/login")}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
