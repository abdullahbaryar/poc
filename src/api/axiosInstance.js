// axiosInstance.js (Advanced Version)
import axios from "axios";
import store from "../store/store";
import { setLogOut } from "../store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ... Request interceptor remains the same ...

axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Store ki state access karein
    const state = store.getState();
    
    // 2. Auth slice se token nikalein (Redux Persist isay maintain rakhega)
    const token = state.auth.token;

    // 3. Header set karein
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar Token Expire ho gaya (401)
    if (error.response && error.response.status === 401) {
      // Logout dispatch karein. 
      // Ye store.js mein rootReducer trigger karega aur sab data clear kar dega.
      store.dispatch(setLogOut());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;