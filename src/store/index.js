import { configureStore } from "@reduxjs/toolkit";
import plantsReducer from "./plants-slice";

const store = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});

export default store;
