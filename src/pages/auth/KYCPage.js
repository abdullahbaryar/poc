import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Container,
  FormHelperText,
} from "@mui/material";
import { CloudUpload, Image as ImageIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

// 1. Import Phone Input & Styles
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css"; // Material theme styling

import { bragIcon, headerright, selfiIcone } from "../../assets/images";
import PageHeader from "../../components/PageHeader";
import { kycValuesSchema } from "../../utils/validationSchemas";
import { submitKYC } from "../../api/authApi";
import toast from "react-hot-toast";

export default function KYCPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: submitKYC,
    onSuccess: (data) => {
      console.log("KYC Success:", data);
      toast.success("KYC Submitted Successfully! Please wait for approval.");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("KYC Error:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to submit KYC. Try again.";
      toast.error(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      dob: "",
      phone: "", // Phone number string format mein aayega (e.g., "923001234567")
      postalCode: "",
      address: "",
      idType: "nid",
      idNumber: "",
      frontImage: null,
      backImage: null,
      selfie: null,
    },
    validationSchema: kycValuesSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  // Reusable styles for Upload Box
  const getUploadBoxStyle = (error) => ({
    border: error ? "1.5px dashed red" : "1.5px dashed #3f51b5",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: error ? "#FFF5F5" : "#F8FAFF",
    cursor: "pointer",
    textAlign: "center",
    height: "100%",
    minHeight: "150px",
  });

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 5 }}>
      <PageHeader
        title="KYC Verification"
        description="KYC verification is required to protect your account and enable full access to all features."
        bgImage={headerright}
      />

      <Container maxWidth="lg">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* === SECTION 1: PERSONAL INFORMATION === */}
          <Typography variant="h1" fontWeight="bold" mb={1}>
            Personal Information
          </Typography>

          <Grid container spacing={2} mb={2}>
            {/* Row 1: Name & DOB */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Full Name
              </Typography>
              <TextField
                fullWidth
                name="fullName"
                placeholder="Enter Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Date of Birth
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                sx={textFieldStyle}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 2: Phone (Updated with React Phone Input) & Postal */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Phone Number
              </Typography>

              {/* 2. Phone Input Component */}
              <Box
                sx={{
                  "& .react-tel-input .form-control": {
                    width: "100%",
                    height: "40px", // Material UI standard height
                    borderRadius: "10px", // Matching your styling
                    borderColor:
                      formik.touched.phone && formik.errors.phone
                        ? "#d32f2f" // Red border on error
                        : "#E5E7EB",
                    backgroundColor: "#fff",
                  },
                  "& .react-tel-input .flag-dropdown": {
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    borderColor:
                      formik.touched.phone && formik.errors.phone
                        ? "#d32f2f"
                        : "#E5E7EB",
                  },
                }}
              >
                <PhoneInput
                  country={"pk"} // Default Country Pakistan
                  value={formik.values.phone}
                  onChange={(phone) => formik.setFieldValue("phone", phone)}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                  specialLabel="" // Label remove kiya kyunki humne upar Typography use kiya hai
                />
              </Box>

              {/* Error Message Display */}
              {formik.touched.phone && formik.errors.phone && (
                <FormHelperText error sx={{ ml: 2 }}>
                  {formik.errors.phone}
                </FormHelperText>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Postal Code
              </Typography>
              <TextField
                fullWidth
                name="postalCode"
                placeholder="Enter Postal Code"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
                sx={textFieldStyle}
              />
            </Grid>

            {/* Row 3: Address */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Address Line
              </Typography>
              <TextField
                fullWidth
                name="address"
                placeholder="Address here..."
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          {/* ... Identity Verification & Upload Sections (Same as before) ... */}
          <Typography variant="h1" fontWeight="bold" mb={1}>
            Identity Verification
          </Typography>

          <Grid container spacing={3} mb={4}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                ID Type
              </Typography>
              <TextField
                select
                fullWidth
                name="idType"
                value={formik.values.idType}
                onChange={formik.handleChange}
                sx={textFieldStyle}
              >
                <MenuItem value="nid">National ID Card (CNIC)</MenuItem>
                <MenuItem value="passport">Passport</MenuItem>
                <MenuItem value="license">Driving License</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                ID Number
              </Typography>
              <TextField
                fullWidth
                name="idNumber"
                placeholder="Enter ID Number"
                value={formik.values.idNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.idNumber && Boolean(formik.errors.idNumber)
                }
                helperText={formik.touched.idNumber && formik.errors.idNumber}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          {/* Uploads */}
          <Grid container spacing={3} mb={5}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Upload ID Front Image
              </Typography>
              <Box
                component="label"
                sx={getUploadBoxStyle(
                  formik.touched.frontImage && formik.errors.frontImage
                )}
              >
                {/* <CloudUpload sx={{ fontSize: 40, color: "#0039CB", mb: 1 }} /> */}
                <img src={bragIcon} alt="bragIcon" />
                <Typography variant="body2" color="text.secondary">
                  Drag & Drop your CNIC Front Image,
                </Typography>
                <Typography variant="body2" color="#0039CB" fontWeight="bold">
                  or Browse to upload
                </Typography>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    formik.setFieldValue("frontImage", e.target.files[0])
                  }
                />
                {formik.values.frontImage && (
                  <Typography variant="caption" color="green" mt={1}>
                    File Selected: {formik.values.frontImage.name}
                  </Typography>
                )}
              </Box>
              {formik.touched.frontImage && formik.errors.frontImage && (
                <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                  {formik.errors.frontImage}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Upload ID Back Image
              </Typography>
              <Box
                component="label"
                sx={getUploadBoxStyle(
                  formik.touched.backImage && formik.errors.backImage
                )}
              >
                {/* <CloudUpload sx={{ fontSize: 40, color: "#0039CB", mb: 1 }} /> */}
                <img src={bragIcon} alt="bragIcon" />
                <Typography variant="body2" color="text.secondary">
                  Drag & Drop your CNIC Back Image,
                </Typography>
                <Typography variant="body2" color="#0039CB" fontWeight="bold">
                  or Browse to upload
                </Typography>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    formik.setFieldValue("backImage", e.target.files[0])
                  }
                />
                {formik.values.backImage && (
                  <Typography variant="caption" color="green" mt={1}>
                    File Selected: {formik.values.backImage.name}
                  </Typography>
                )}
              </Box>
              {formik.touched.backImage && formik.errors.backImage && (
                <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                  {formik.errors.backImage}
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          {/* Selfie Section */}
          <Typography variant="h1" fontWeight="bold" mt={3}>
            Face Identification
          </Typography>
          <Box mb={5}>
            <Box
              component="label"
              sx={{
                width: { xs: "100%", sm: "150px" },
                height: "150px",
                bgcolor: "#F3F4F6",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                mt: "20px",
                border:
                  formik.touched.selfie && formik.errors.selfie
                    ? "1px solid red"
                    : "1px solid #E5E7EB",
              }}
            >
              <Box sx={{ mb: 1 }}>
                <img src={selfiIcone} alt="selfiIcone" />
              </Box>
              <Typography
                variant="caption"
                fontWeight="bold"
                color="text.secondary"
              >
                Upload Selfie
              </Typography>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("selfie", e.target.files[0])
                }
              />
            </Box>
            {formik.values.selfie && (
              <Typography variant="caption" color="green" mt={1}>
                File Selected
              </Typography>
            )}
            {formik.touched.selfie && formik.errors.selfie && (
              <FormHelperText error>{formik.errors.selfie}</FormHelperText>
            )}
          </Box>

          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending}
              sx={{
                bgcolor: "#0039CB",
                px: 6,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#002a9e" },
              }}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Styling helper for TextFields
const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#0039CB" },
  },
};
