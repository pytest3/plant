import { createSlice, current } from "@reduxjs/toolkit";
import { formatLastWatered } from "../utils/Utils";
import { format } from "date-fns";

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
    changeLastWateredToToday: (state, action) => {
      console.log("yessir");
      const plantIndex = state.allPlants.findIndex(
        (item) => item.id === action.payload
      );
      state.allPlants[plantIndex].lastWatered = format(
        new Date(),
        "yyyy-MM-dd"
      );
    },
  },
});

//export action creators
export const { addPlant, refreshPlantList, changeLastWateredToToday } =
  plantsSlice.actions;

//export reducers object
export default plantsSlice.reducer;
