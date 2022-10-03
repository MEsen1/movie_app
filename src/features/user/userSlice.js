import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const isLoggedIn = () => (dispatch, getState) => {
  const { user } = getState();

  if (user.isLoggedIn === false) return false;

  // if (!user.token.token || !user.token) return false;
  // console.log(!user.token);
  // console.log(user.token);
  // console.log(!user.token.token);
  // console.log(user.token.token);

  if (new Date(user.token.expiryDateTime) > new Date()) return true;
  else {
    dispatch(logOut());
    return false;
  }
};

export const loadAuthToken = () => (dispatch, _) => {
  let authTokenString = localStorage.getItem("user");

  if (authTokenString) {
    const authToken = JSON.parse(authTokenString);
    dispatch(logIn(authToken));
    return true;
  } else {
    dispatch(logOut());
    return false;
  }
};

export default userSlice.reducer;
