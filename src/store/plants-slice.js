import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const initialState = {
  allPlants: [],
  currentPlantId: null,
  enteredSearchTerm: null,
  deleteConfirmation: null,
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addPlant: (state, action) => {
      state.allPlants.push(action.payload);
    },
    refreshPlantList: (state, action) => {
      state.allPlants = action.payload;
    },
    changeLastWateredToToday: (state, action) => {
      const plantIndex = state.allPlants.findIndex(
        (item) => item.id === action.payload
      );
      state.allPlants[plantIndex].lastWatered = format(
        new Date(),
        "yyyy-MM-dd"
      );
    },
    setCurrentPlantId: (state, action) => {
      state.currentPlantId = action.payload;
    },
    searchPlantName: (state, action) => {
      state.enteredSearchTerm = action.payload;
    },
    deletePlant: (state, action) => {
      state.deleteConfirmation = true;
      state.allPlants = state.allPlants.filter(
        (plant) => plant.id !== action.payload
      );
    },
    editPlant: (state, action) => {
      state.allPlants.map((plant) => {
        if (plant.id === action.payload.id) {
          plant.lastWatered = action.payload.lastWatered;
        }
        return plant;
      });
    },
  },
});

//export action creators
export const {
  addPlant,
  refreshPlantList,
  changeLastWateredToToday,
  setCurrentPlantId,
  searchPlantName,
  deletePlant,
  editPlant,
} = plantsSlice.actions;

//export reducers object
export default plantsSlice.reducer;
