import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
  Link,
} from "@mui/material";
import {
  Store,
  PersonOutline,
  Visibility,
  VisibilityOff,
  LockOutlined, // New Icon for Header
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import ViewSplashScreen from "./components/viewSplashScreen/ViewSplashScreen ";
import { boxBottom, loginIcone } from "../../assets/images";
import { registerUser } from "../../api/authApi";
import { signUpValuesSchema } from "../../utils/validationSchemas";
import { useMutation } from "@tanstack/react-query";
// import ViewSplashScreen from "./components/viewSplashScreen/ViewSplashScreen "; // Isko direct styling se replace kiya hai image styling ke liye

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (apiResponse) => {
      console.log("Register Success Data:", apiResponse);

      dispatch(
        loginSuccess({
          name: apiResponse.user?.name || "New User",
          role: apiResponse.user?.role || "user",
          email: apiResponse.user?.email,
          token: apiResponse.token, // Token save karna zaroori hai
          walletAddress: apiResponse.user?.walletAddress || "",
        })
      );

      toast.success("Account created successfully!", {
        position: "top-center",
      });
      navigate("/kyc"); // KYC page par bhejein
    },
    onError: (error) => {
      console.error("Register Error:", error);
      const errorMessage =
        error?.response?.data?.message || "Registration failed!";
      toast.error(errorMessage, { position: "top-center" });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "user",
    },
    validationSchema: signUpValuesSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...apiData } = values;
      mutate(apiData);
    },
  });

  return (
    <Box className="fade-in">
      {/* 1. Main Grid Container */}
      <Grid
        container
        sx={{
          height: { xs: "auto", md: "100vh" },
          overflow: { xs: "auto", md: "hidden" },
        }}
      >
        {/* 2. Left Side (Blue Background styling added here) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ViewSplashScreen />
        </Grid>

        {/* 3. Right Side (Form) */}
        <Grid
          size={{ xs: 12, sm: 12, md: 6 }}
          sx={{
            height: "100%",
            overflowY: { xs: "unset", md: "auto" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            backgroundImage: `url(${boxBottom})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Card
              sx={{
                maxWidth: 450, // Width thodi kam ki taaki clean lage
                width: "100%",
                p: 2,
                // my: 1,
                // boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                bgcolor: "white",
                borderRadius: "20px",
                boxShadow: "3px 5px 56px 0px #B6BACB26",
                // mt: 30,
              }}
            >
              <CardContent>
                {/* Header Icon & Text */}
                {/* <Stack alignItems="center" spacing={2} mb={4}> */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    {/* Yahan Logo Icon use karein */}
                    <img
                      src={loginIcone}
                      alt="loginIcone"
                      width={50}
                      height={50}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h5" fontWeight="bold" color="#0047AB">
                      Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Join us in a few simple steps. Enter your details below to
                      get started.
                    </Typography>
                  </Box>
                {/* </Stack> */}

                <form onSubmit={formik.handleSubmit}>
                  {/* Name Field */}
                  <Box sx={{ mb: 2 }}>
                    <Typography>Name</Typography>
                    <TextField
                      name="name"
                      placeholder="Enter Full Name"
                      fullWidth
                      // variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#F9FAFB",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      }}
                    />
                  </Box>

                  {/* Email Field */}
                  <Box sx={{ mb: 2 }}>
                    <Typography>Email</Typography>
                    <TextField
                      name="email"
                      placeholder="Enter Email"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#F9FAFB",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      }}
                    />
                  </Box>

                  {/* Account Type */}
                  <Box sx={{ mb: 2 }}>
                    <Typography>Account Type</Typography>
                    <TextField
                      select
                      name="type"
                      fullWidth
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#F9FAFB",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      }}
                    >
                      <MenuItem value="user">Retail User</MenuItem>
                      <MenuItem value="merchant">Merchant</MenuItem>
                    </TextField>
                  </Box>

                  {/* Password */}
                  <Box sx={{ mb: 2 }}>
                    <Typography>Password</Typography>
                    <TextField
                      name="password"
                      placeholder="Enter Password"
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#F9FAFB",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      }}
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

                  {/* Confirm Password */}
                  <Box sx={{ mb: 3 }}>
                    <Typography>Confirm Password</Typography>
                    <TextField
                      name="confirmPassword"
                      placeholder="Enter Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      fullWidth
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#F9FAFB",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
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
                    sx={{
                      py: 1.5,
                      bgcolor: "#0047AB",
                      borderRadius: "10px",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </Button>
                </form>

                <Box mt={3} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{" "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/login")}
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
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
