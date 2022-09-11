import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  title: "",
  message: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    sendNotification: (state, action) => {
      if (action.payload === "sending") {
        return {
          status: "sending",
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
      return initialState;
    },
  },
});

export default uiSlice.reducer;
export const { sendNotification } = uiSlice.actions;
