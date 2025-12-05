import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

// --- DUMMY API FUNCTION ---
const submitSettlementRequest = async (values) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("API Call Success:", values);
      resolve({ success: true, message: "Request Submitted" });
    }, 2000); // 2 seconds delay to simulate network
  });
};

const SettleFundsModal = ({ open, onClose, maxBalance = 10000000 }) => {
  const [loading, setLoading] = useState(false);

  // Formik Validation Schema
  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .min(100, "Minimum settlement is 100 SKRW")
      .max(maxBalance, "Insufficient balance"),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        // API Call
        await submitSettlementRequest(values);

        // Success Logic
        alert(`Success! Settlement of ${values.amount} SKRW requested.`);
        resetForm();
        onClose(); // Modal band karein
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // Calculate "You Receive" (Assuming 1:1 conversion for demo, logic change kar sakte hain)
  const receiveAmount = formik.values.amount
    ? Number(formik.values.amount).toLocaleString()
    : "0";

  // Handle Max Button Click
  const handleMaxClick = () => {
    formik.setFieldValue("amount", maxBalance);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "24px", padding: 3 }, // Image jaisa rounded modal
      }}
    >
      {/* 1. Header with Close Button */}
      <DialogTitle
        sx={{
          p: 0,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="700">
          Create Settlement Request
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fill in the required details to initiate your settlement
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ p: 0 }}>
          {/* 2. Amount Input Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
              Amount
            </Typography>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              placeholder="Enter Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                sx: { borderRadius: "12px", bgcolor: "#fff" }, // Rounded Input
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ mr: 1, color: "#666" }}
                    >
                      SKRW
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight="bold"
                      sx={{ color: "#0047AB", cursor: "pointer" }}
                      onClick={handleMaxClick}
                    >
                      Max
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* 3. You Receive Box (Blue Background) */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
              You Receive
            </Typography>
            <Box
              sx={{
                bgcolor: "#F0F4FF", // Light blue bg
                borderRadius: "12px",
                py: 3,
                textAlign: "center",
                border: "1px solid #E0EAFF",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#0047AB" }}
              >
                {receiveAmount} KRW
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        {/* 4. Action Buttons */}
        <DialogActions
          sx={{ p: 0, mt: 2, gap: 2, justifyContent: "space-between" }}
        >
          {/* Cancel Button */}
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            
          >
            Cancel
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SettleFundsModal;
