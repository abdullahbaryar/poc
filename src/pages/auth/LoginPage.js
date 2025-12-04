import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Imports from your project structure
import { loginSuccess } from "../../store/slices/authSlice";
import { logInUser } from "../../api/authApi";
import { LoginValuesSchema } from "../../utils/validationSchemas";
import ViewSplashScreen from "./components/viewSplashScreen/ViewSplashScreen "; // Ensure path is correct

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation(logInUser, {
    onSuccess: (data) => {
      navigate("/");
      toast.success("Sign-in successful", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginValuesSchema,
    onSubmit: (values) => {
      mutate(values);
      // Mock logic for role (remove/adjust as needed)
      let role = "user";
      if (values.email.includes("admin")) role = "admin";
      dispatch(
        loginSuccess({
          name: values.email.split("@")[0],
          role: role,
          walletAddress: "0x123...ABC",
        })
      );
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", overflow: "hidden" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Side (Blue Screen) */}
        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <ViewSplashScreen />
        </Grid>

        {/* Right Side (Form) */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 400 }}>
              {/* Header Icon & Text */}
              <Stack alignItems="center" spacing={2} mb={5}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    bgcolor: "#0047AB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {/* Yahan Logo Icon use karein */}
                  <LockOutlined />
                </Box>
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold" color="#0047AB">
                    Welcome Back!
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Sign in to access your account and continue where you left
                    off.
                  </Typography>
                </Box>
              </Stack>

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    placeholder="Enter Email"
                    fullWidth
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#F9FAFB",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    Password
                  </Typography>
                  <TextField
                    name="password"
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#F9FAFB",
                      },
                    }}
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
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: "#0047AB", // Blue color
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#003380" },
                  }}
                >
                  Sign Up
                </Button>
              </form>

              {/* Footer Link */}
              <Box mt={3} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/login")} // Image me ye text 'Sign In' hai, shayad flow different ho
                    sx={{
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "#0047AB",
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
