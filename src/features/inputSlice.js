import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInput: "",
  movie: "",
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    inputTaken: (state, action) => {
      state.userInput = action.payload;
    },
    movieType: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { inputTaken, movieType } = inputSlice.actions;

export default inputSlice.reducer;
