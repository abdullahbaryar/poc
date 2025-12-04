/* eslint-disable no-unused-vars */
import axiosInstance from "./axiosInstance";

export const logInUser = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      data
    );
    const res = response.data;

    return res;
  } catch (error) {
    /* empty */
  }
};
