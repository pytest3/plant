import { configureStore } from "@reduxjs/toolkit";
import plantsReducer from "./plants-slice";
import uiReducer from "./ui-slice";
import photosReducer from "./photos-slice";

const store = configureStore({
  reducer: {
    plants: plantsReducer,
    ui: uiReducer,
    photos: photosReducer,
  },
});

export default store;
