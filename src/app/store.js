import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import inputReducer from "../features/inputSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    input: inputReducer,
  },
});

export default store;
