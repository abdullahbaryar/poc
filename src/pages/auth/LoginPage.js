import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

// ✅ Formik & Yup Imports
import { useFormik } from "formik";
import * as Yup from "yup";
import ViewSplashScreen from "./components/viewSplashScreen/ViewSplashScreen ";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // ✅ Validation Schema
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    // ✅ Submit Handler
    onSubmit: (values) => {
      // Simulate Logic based on email text
      let role = "user";
      if (values.email.includes("admin")) role = "admin";
      else if (values.email.includes("merchant")) role = "merchant";
      else if (values.email.includes("regulator")) role = "regulator";

      dispatch(
        loginSuccess({
          name: values.email.split("@")[0],
          role: role,
          walletAddress: "0x123...ABC",
        })
      );
      navigate("/");
    },
  });

  return (
    <Box className="fade-in">
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <ViewSplashScreen
            text="Support poc early, "
            text2=" and be rewarded as they grow."
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Box
            sx={{
              minHeight: { xs: "auto", md: "100vh" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Card sx={{ maxWidth: 450, width: "100%", borderRadius: 3, p: 2 }}>
              <CardContent>
                <Box textAlign="center" mb={4}>
                  <Typography variant="h4" sx={{textAlign:'center'}}  >
                    Welcome Back
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign in to continue to ZenithCatena
                  </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ minHeight: "95px" }}>
                    <Typography>Email Address</Typography>
                    <TextField
                      name="email"
                      placeholder="Email Address"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    
                    />
                  </Box>

                  <Box sx={{ minHeight: "95px" }}>
                    <Typography>Password</Typography>
                    <TextField
                      name="password"
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                    sx={{ mt: "20px" }}
                  >
                    Sign In
                  </Button>
                </form>

                <Box mt={3} textAlign="center">
                  <Typography variant="body2">
                    Don't have an account?{" "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/register")}
                      sx={{ fontWeight: "bold", textDecoration: "none" }}
                    >
                      Register Here
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
