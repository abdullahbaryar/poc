import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null, // { name, role, walletAddress }
  loading: false,
  logout: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLogOut(state, action) {
      state.logout = action.payload;
    },
    setToken(state, action) {
      state.logout = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, logout, setLogOut, setToken } =
  authSlice.actions;
export default authSlice.reducer;
