import React, { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

// --- DUMMY API FUNCTION ---
const submitTransactionApi = async (type, values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate Success
      console.log(`API Call [${type.toUpperCase()}]:`, values);
      resolve({ success: true, message: `${type} request successful!` });

      // Simulate Error (Uncomment to test)
      // reject(new Error("Network Error"));
    }, 2000);
  });
};

const SettleFundsModal = ({
  open,
  onClose,
  type, // 'settle' or 'deposit'
  balance = 0,
  currencyCode = "SKRW",
}) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // --- CONFIGURATION BASED ON TYPE ---
  const isSettle = type === "settle";

  const config = {
    title: isSettle ? "Create Settlement Request" : "Create Deposit Request",
    desc: isSettle
      ? "Fill in the details to settle your funds back to your account."
      : "Fill in the details to deposit funds into your wallet.",
    inputLabel: "Amount",
    inputCurrency: isSettle ? currencyCode : "KRW", // Settle me SKRW denge, Deposit me KRW
    outputCurrency: isSettle ? "KRW" : currencyCode, // Result opposite hoga
    btnText: isSettle ? "Submit Settlement" : "Submit Deposit",
  };

  // --- VALIDATION SCHEMA ---
  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(100, `Minimum ${type} is 100`)
      // Sirf Settlement ke liye Balance check karein
      .when([], {
        is: () => isSettle,
        then: (schema) =>
          schema.max(
            balance,
            `Insufficient wallet balance (${balance} ${currencyCode})`
          ),
      }),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Type change hone par form reset ho
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setApiError(null);
      try {
        // API Call
        await submitTransactionApi(type, values);

        // Success Handling
        alert(`Success! ${config.title} for ${values.amount} submitted.`);
        resetForm();
        onClose();
      } catch (error) {
        setApiError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Modal close hone par error clear karein
  useEffect(() => {
    if (!open) {
      setApiError(null);
      formik.resetForm();
    }
  }, [open]);

  // Calculate "You Receive" (Assuming 1:1 conversion for demo)
  const receiveAmount = formik.values.amount
    ? Number(formik.values.amount).toLocaleString()
    : "0";

  const handleMaxClick = () => {
    // Deposit ke liye Max logic shayad alag ho, usually Settlement ke liye user ka pura balance daalte hain
    if (isSettle) {
      formik.setFieldValue("amount", balance);
    } else {
      // Example: Deposit limit (dummy)
      formik.setFieldValue("amount", 10000000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose} // Loading ke waqt close disable
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "24px", padding: 2 },
      }}
    >
      {/* 1. Header */}
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
          {config.title}
        </Typography>
        <IconButton onClick={onClose} size="small" disabled={loading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {config.desc}
      </Typography>

      {/* API Error Alert */}
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ p: 0 }}>
          {/* 2. Amount Input */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
              {config.inputLabel}
            </Typography>
            <TextField
              fullWidth
              name="amount"
              placeholder="Enter Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                sx: { borderRadius: "12px", bgcolor: "#fff" },
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ mr: 1, color: "#666" }}
                    >
                      {config.inputCurrency}
                    </Typography>
                    {/* Max button usually sirf Settlement me logic banata hai */}
                    {isSettle && (
                      <Typography
                        component="span"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          color: "#0047AB",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={handleMaxClick}
                      >
                        Max
                      </Typography>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* 3. You Receive Box */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
              You Receive
            </Typography>
            <Box
              sx={{
                bgcolor: "#F0F4FF",
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
                {receiveAmount} {config.outputCurrency}
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        {/* 4. Actions */}
        <DialogActions sx={{ p: 0, mt: 2, gap: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: "10px",
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
            }}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: "10px",
              py: 1.2,
              bgcolor: "#0047AB",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#003580" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              config.btnText
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SettleFundsModal;
