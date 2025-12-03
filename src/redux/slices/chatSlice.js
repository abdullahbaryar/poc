import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEmail: null,
  replayData: null,
  open: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedEmail(state, action) {
      state.selectedEmail = action.payload;
    },
    setReplayData(state, action) {
      state.replayData = action.payload;
    },
    OpenDeleteModal(state, action) {
      state.open = action.payload;
    },
  },
});

export const { setReplayData, setSelectedEmail, OpenDeleteModal } =
  chatSlice.actions;

export default chatSlice.reducer;
