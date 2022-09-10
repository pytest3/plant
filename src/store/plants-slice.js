import { createSlice, current } from "@reduxjs/toolkit";
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
  plants: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addPlant: (state, action) => {
      state.plants.push(action.payload);
      console.log(current(state.plants));
    },
  },
});

//export action creators
export const { addPlant } = plantsSlice.actions;

//export reducers object
export default plantsSlice.reducer;
