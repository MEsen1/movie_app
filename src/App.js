import React from "react";
import AppRouter from "./approuter/AppRouter";

import { CssBaseline } from "@material-ui/core";

import "./App.css";

window.onbeforeunload = () => {
  localStorage.removeItem("token");
};

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
};

export default App;
