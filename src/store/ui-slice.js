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
        console.log("sending");
        return {
          status: "sending",
          title: "Sending!",
          message: "Sending plants data..",
        };
      } else if (action.payload === "success") {
        console.log("success");
        return {
          status: "success",
          title: "Success!",
          message: "Sent plants data!",
        };
      } else if (action.payload === "error") {
        console.log("error");
        return {
          status: "error",
          title: "Error!",
          message: "Failed to send plants data",
        };
      }
    },
  },
});

export default uiSlice.reducer;
export const { sendNotification } = uiSlice.actions;
