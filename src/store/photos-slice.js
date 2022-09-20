import { createSlice } from "@reduxjs/toolkit";

const initialState = { allPhotos: [] };

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    refreshPhotos: (state, action) => {
      state.allPhotos = action.payload;
    },
  },
});

export const { refreshPhotos } = photosSlice.actions;
export default photosSlice.reducer;
