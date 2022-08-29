import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import DashBoard from "../Pages/DashBoard";
import Details from "../Pages/Details";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="" element={<DashBoard />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
