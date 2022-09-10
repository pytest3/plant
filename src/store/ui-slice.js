import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "",
  title: "",
  message: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    sendNotification: (state, action) => {
      if (action.payload.type === "sending") {
        return {
          status: "sending",
          title: "Sending!",
          message: "Sending plants data..",
        };
      }
    },
  },
});
