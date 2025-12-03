import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loginData: null,
  logout: "",
};

export const loginSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoginData(state, action) {
      state.loginData = action.payload;
    },

    setLogOut(state, action) {
      state.logout = action.payload;
    },
  },
});

export const { setToken, setLoginData, setLogOut } = loginSlice.actions;

export default loginSlice.reducer;
