import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  title: "",
  message: "",
  isModalShown: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    sendNotification: (state, action) => {
      if (action.payload === "pending") {
        return {
          status: "pending",
          title: "Sending!",
          message: "Sending plants data..",
        };
      } else if (action.payload === "success") {
        return {
          status: "success",
          title: "Success!",
          message: "Sent plants data!",
        };
      } else if (action.payload === "error") {
        return {
          status: "error",
          title: "Error!",
          message: "Failed to send plants data",
        };
      }
      // return initialState;
    },
    toggleModal: (state, action) => {
      if (action.payload === "show") {
        state.isModalShown = true;
      } else if (action.payload === "hide") {
        state.isModalShown = false;
      } else {
        state.isModalShown = !state.isModalShown;
      }
    },
  },
});

export default uiSlice.reducer;
export const { sendNotification, toggleModal } = uiSlice.actions;
