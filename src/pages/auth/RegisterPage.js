import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment,
  Grid,
  IconButton,
  FormHelperText,
} from "@mui/material";
import {
  CloudUpload,
  BadgeOutlined,
  Person,
  Email,
  Store,
  PersonOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

// ✅ Formik & Yup Imports
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      type: "user",
      cnic: "",
      frontImage: null,
      backImage: null,
    },
    // ✅ Validation Schema
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      type: Yup.string().required("Account type is required"),
      cnic: Yup.string()
        // CNIC Regex: 5 digits - 7 digits - 1 digit
        .matches(
          /^\d{5}-\d{7}-\d{1}$/,
          "Invalid CNIC format (e.g. 12345-1234567-1)"
        )
        .required("CNIC is required"),
      frontImage: Yup.mixed().required("Front ID image is required"),
      backImage: Yup.mixed().required("Back ID image is required"),
    }),
    // ✅ Submit Handler
    onSubmit: (values) => {
      console.log("Register Values:", values);

      // Dispatch Action
      dispatch(
        loginSuccess({
          name: values.name,
          role: values.type,
          walletAddress: "0xNEW...USER",
        })
      );
      navigate("/");
    },
  });

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
      <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, p: 2 }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join ZenithCatena as a User or Merchant
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              {/* Row 1: Type Selection */}
              <TextField
                select
                label="Account Type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formik.values.type === "merchant" ? (
                        <Store />
                      ) : (
                        <PersonOutline />
                      )}
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="user">Retail User</MenuItem>
                <MenuItem value="merchant">Merchant</MenuItem>
              </TextField>

              {/* Row 2: Name & Email */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Full Name"
                    name="name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Row 3: Password & CNIC */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="CNIC Number"
                    name="cnic"
                    placeholder="12345-1234567-1"
                    fullWidth
                    value={formik.values.cnic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cnic && Boolean(formik.errors.cnic)}
                    helperText={formik.touched.cnic && formik.errors.cnic}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeOutlined fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Row 4: File Uploads */}
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Upload ID (CNIC) Photos
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    variant={
                      formik.values.frontImage ? "contained" : "outlined"
                    }
                    color={formik.values.frontImage ? "success" : "primary"}
                    component="label"
                    fullWidth
                    startIcon={<CloudUpload />}
                    sx={{ height: 50, textTransform: "none" }}
                  >
                    {formik.values.frontImage
                      ? "Front Uploaded"
                      : "Upload Front"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      // ✅ Set File in Formik
                      onChange={(e) =>
                        formik.setFieldValue("frontImage", e.target.files[0])
                      }
                    />
                  </Button>
                  {/* Validation Error for File */}
                  {formik.touched.frontImage && formik.errors.frontImage && (
                    <FormHelperText error sx={{ textAlign: "center" }}>
                      {formik.errors.frontImage}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Button
                    variant={formik.values.backImage ? "contained" : "outlined"}
                    color={formik.values.backImage ? "success" : "primary"}
                    component="label"
                    fullWidth
                    startIcon={<CloudUpload />}
                    sx={{ height: 50, textTransform: "none" }}
                  >
                    {formik.values.backImage ? "Back Uploaded" : "Upload Back"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      // ✅ Set File in Formik
                      onChange={(e) =>
                        formik.setFieldValue("backImage", e.target.files[0])
                      }
                    />
                  </Button>
                  {/* Validation Error for File */}
                  {formik.touched.backImage && formik.errors.backImage && (
                    <FormHelperText error sx={{ textAlign: "center" }}>
                      {formik.errors.backImage}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
              >
                Register & Continue
              </Button>
            </Stack>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/login")}
                sx={{ fontWeight: "bold" }}
              >
                Login here
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
