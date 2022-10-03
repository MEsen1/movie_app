import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { Stack, Alert, Box } from "@mui/material";
import { isLoggedIn } from "../features/user/userSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const loggedIn = dispatch(isLoggedIn());

  return <div>{!loggedIn ? <Navigate to={"/login"} /> : <Outlet />}</div>;
};

export default ProtectedRoute;
