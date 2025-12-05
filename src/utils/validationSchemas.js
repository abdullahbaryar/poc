import * as Yup from "yup";

export const LoginValuesSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signUpValuesSchema = Yup.object({
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
});

export const kycValuesSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full Name is required"),
  dob: Yup.string().required("Date of Birth is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  postalCode: Yup.string()
    .matches(/^[0-9]+$/, "Postal code must be digits")
    .required("Postal Code is required"),
  address: Yup.string()
    .min(10, "Address should be detailed (min 10 chars)")
    .required("Address is required"),
  idType: Yup.string().required("ID Type is required"),
  idNumber: Yup.string()
    .min(5, "Invalid ID Number")
    .required("ID Number is required"),
  frontImage: Yup.mixed().required("Front ID image is required"),
  backImage: Yup.mixed().required("Back ID image is required"),
  selfie: Yup.mixed().required("Selfie is required"),
});
