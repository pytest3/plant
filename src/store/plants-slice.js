import { createSlice } from "@reduxjs/toolkit";
// const initialState = {

//     id: getRandomInt(),
//     name: capitalize(enteredName),
//     lastWatered: enteredLastWatered,
//     frequency: enteredFrequency,
//     daysSinceLast: calculateDaysSinceLast(enteredLastWatered)
// }

// const initialState = {
//   id: "",
//   name: "",
//   lastWatered: "",
//   frequency: "",
//   daysSinceLast: "",
// };

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
  },
});

//export action creators
export const { addPlant } = plantsSlice.actions;

//export reducers object
export default plantsSlice.reducer;
