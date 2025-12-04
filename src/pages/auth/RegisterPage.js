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
} from "@mui/material";
import {
  Store,
  PersonOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import ViewSplashScreen from "./components/viewSplashScreen/ViewSplashScreen ";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "user",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      type: Yup.string().required("Account type is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log("Register Values:", values);
      dispatch(
        loginSuccess({
          name: values.name,
          role: values.type,
          walletAddress: "0xNEW...USER",
        })
      );
      navigate("/kyc");
    },
  });

  return (
    <Box className="fade-in">
      {/* 1. Main Grid Container: Set height to 100vh on Desktop to lock the page */}
      <Grid
        container
        sx={{
          height: { xs: "auto", md: "100vh" }, // Auto on mobile, Full height on Desktop
          overflow: { xs: "auto", md: "hidden" }, // Hide main window scrollbar on Desktop
        }}
      >
        {/* 2. Left Side (Static) */}
        <Grid
          item // Added item prop if using Grid v2
          size={{ xs: 12, sm: 12, md: 6 }}
          sx={{
            height: "100%", // Fill the parent height
            position: "relative",
            // Ensure ViewSplashScreen fills this area
          }}
        >
          <ViewSplashScreen
            text="Support poc early, "
            text2=" and be rewarded as they grow."
          />
        </Grid>

        {/* 3. Right Side (Scrollable) */}
        <Grid
          item // Added item prop if using Grid v2
          size={{ xs: 12, sm: 12, md: 6 }}
          sx={{
            height: "100%", // Match parent height
            overflowY: { xs: "unset", md: "auto" }, // Enable scrollbar ONLY here on desktop
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // Keeps the card centered vertically if content is short
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              p: 2,
              // Removed minHeight: 100vh here because the Grid parent handles the height now
            }}
          >
            <Card
              sx={{
                maxWidth: 600,
                width: "100%",
                borderRadius: 3,
                p: 2,
                my: 4,
              }}
            >
              <CardContent>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Create Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Join ZenithCatena as a User or Merchant
                  </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ minHeight: "95px" }}>
                    <Typography>Account Type</Typography>
                    <TextField
                      select
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
                  </Box>

                  <Box sx={{ minHeight: "95px" }}>
                    <Typography>Full Name</Typography>
                    <TextField
                      name="name"
                      placeholder="Full Name"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Box>

                  <Box sx={{ minHeight: "95px" }}>
                    <Typography>Email</Typography>
                    <TextField
                      name="email"
                      placeholder="Email"
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

                  <Box sx={{ minHeight: "95px" }}>
                    <Typography>Confirm Password</Typography>
                    <TextField
                      name="confirmPassword"
                      placeholder="Confirm Password"
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
                    sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
                  >
                    Register & Continue
                  </Button>
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
        </Grid>
      </Grid>
    </Box>
  );
}
