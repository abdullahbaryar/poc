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
import { boxBottom, loginIcone } from "../../assets/images";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: logInUser,
    onSuccess: (apiResponse) => {
      // API se response ane par yahan ayega
      console.log("Login Success Data:", apiResponse);

      // 2. Redux Store update karein (Real Data ke sath)
      // Note: Make sure apiResponse ka structure backend se match kare
      dispatch(
        loginSuccess({
          name: apiResponse.user?.name || "User",
          role: apiResponse.user?.role || "user",
          email: apiResponse.user?.email,
          token: apiResponse.token,
          walletAddress: apiResponse.user?.walletAddress || "",
        })
      );

      // 3. Navigate & Toast
      toast.success("Sign-in successful", { position: "top-center" });
      navigate("/");
    },
    onError: (error) => {
      // Error handling
      console.error("Login Error:", error);
      const errorMessage =
        error?.response?.data?.message || "Invalid credentials!";
      toast.error(errorMessage, { position: "top-center" });
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginValuesSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", overflow: "hidden" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Side (Blue Screen) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ViewSplashScreen />
        </Grid>

        {/* Right Side (Form) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              backgroundColor: "#fff",
              backgroundImage: `url(${boxBottom})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom right",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 450,
                bgcolor: "white",
                borderRadius: "20px",
                boxShadow: "3px 5px 56px 0px #B6BACB26",
                p: 5,
                mx: "auto",
              }}
            >
              {/* Header Icon & Text */}
              {/* <Stack alignItems="center" spacing={2} mb={3}> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width:'100%'
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
                    Welcome Back!
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Sign in to access your account and continue where you left
                    off.
                  </Typography>
                </Box>
              {/* </Stack> */}

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography>Email</Typography>
                  <TextField
                    name="email"
                    placeholder="Enter Email"
                    fullWidth
                    // variant="outlined"
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
                  <Typography>Password</Typography>
                  <TextField
                    name="password"
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    // variant="outlined"
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
                  Sign In
                </Button>
              </form>

              {/* Footer Link */}
              <Box mt={3} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/register")} // Image me ye text 'Sign In' hai, shayad flow different ho
                    sx={{
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "#0047AB",
                    }}
                  >
                    Sign Up
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
