import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  userToken,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem("token", JSON.stringify(state.userToken));
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
