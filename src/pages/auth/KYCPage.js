import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
  Grid,
} from "@mui/material";
import {
  CloudUpload,
  BadgeOutlined,
  Person,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ViewSplashScreen from "./components/viewSplashScreen/ViewSplashScreen ";

export default function KYCPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cnic: "",
      frontImage: null,
      backImage: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      cnic: Yup.string()
        .matches(
          /^\d{5}-\d{7}-\d{1}$/,
          "Invalid CNIC format (e.g. 12345-1234567-1)"
        )
        .required("CNIC is required"),
      frontImage: Yup.mixed().required("Front ID image is required"),
      backImage: Yup.mixed().required("Back ID image is required"),
    }),
    onSubmit: (values) => {
      console.log("KYC Data:", values);
      // Handle KYC Submission Logic Here
      navigate("/dashboard");
    },
  });

  return (
    <Box className="fade-in">
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          {/* You can change text here for KYC specific messaging */}
          <ViewSplashScreen
            text="Complete your KYC "
            text2=" to unlock full features."
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
            <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, p: 2 }}>
              <CardContent>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Identity Verification
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please provide your details for KYC
                  </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                  {/* Row 1: Name & Email */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ minHeight: "95px" }}>
                        <Typography>Full Name</Typography>
                        <TextField
                          name="name"
                          placeholder="Full Name"
                          fullWidth
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
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
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Row 2: Password & CNIC */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ minHeight: "95px" }}>
                        <Typography>Password</Typography>
                        <TextField
                          name="password"
                          placeholder="Password"
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
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ minHeight: "95px" }}>
                        <Typography>CNIC Number</Typography>
                        <TextField
                          name="cnic"
                          placeholder="CNIC Number"
                          fullWidth
                          value={formik.values.cnic}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.cnic && Boolean(formik.errors.cnic)
                          }
                          helperText={formik.touched.cnic && formik.errors.cnic}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Row 3: File Uploads */}
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
                          onChange={(e) =>
                            formik.setFieldValue(
                              "frontImage",
                              e.target.files[0]
                            )
                          }
                        />
                      </Button>
                      {formik.touched.frontImage &&
                        formik.errors.frontImage && (
                          <FormHelperText error sx={{ textAlign: "center" }}>
                            {formik.errors.frontImage}
                          </FormHelperText>
                        )}
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Button
                        variant={
                          formik.values.backImage ? "contained" : "outlined"
                        }
                        color={formik.values.backImage ? "success" : "primary"}
                        component="label"
                        fullWidth
                        startIcon={<CloudUpload />}
                        sx={{ height: 50, textTransform: "none" }}
                      >
                        {formik.values.backImage
                          ? "Back Uploaded"
                          : "Upload Back"}
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) =>
                            formik.setFieldValue("backImage", e.target.files[0])
                          }
                        />
                      </Button>
                      {formik.touched.backImage && formik.errors.backImage && (
                        <FormHelperText error sx={{ textAlign: "center" }}>
                          {formik.errors.backImage}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
                  >
                    Submit KYC
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
