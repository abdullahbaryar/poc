// src/services/authService.js
import axiosInstance from "./axiosInstance";

export const logInUser = async (data) => {
  // Try-catch hataya taaki error component tak pohnch sake
  const response = await axiosInstance.post(
    "/auth/login", // baseURL already setup hai axiosInstance mein
    data
  );
  return response.data;
};

export const registerUser = async (data) => {
  // Try-catch hata diya taaki React Query error pakad sake
  const response = await axiosInstance.post(
    "/auth/register", // Endpoint check kar lena backend se
    data
  );
  return response.data;
};

export const submitKYC = async (data) => {
  const formData = new FormData();

  // Loop through all form values and append to FormData
  Object.keys(data).forEach((key) => {
    // Agar value null nahi hai tabhi append karein
    if (data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  // Request bhejein (Browser automatically Content-Type multipart/form-data set kar dega)
  const response = await axiosInstance.post("/kyc/submit", formData);
  return response.data;
};
