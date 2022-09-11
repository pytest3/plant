import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPlants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addPlant: (state, action) => {
      state.allPlants.push(action.payload);
    },
    refreshPlantList: (state, action) => {
      return action.payload;
    },
  },
});

//export action creators
export const { addPlant, refreshPlantList } = plantsSlice.actions;

//export reducers object
export default plantsSlice.reducer;
