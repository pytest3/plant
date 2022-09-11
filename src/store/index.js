import { configureStore } from "@reduxjs/toolkit";
import plantsReducer from "./plants-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    plants: plantsReducer,
    ui: uiReducer,
  },
});

export default store;
