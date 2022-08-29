import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Stack, Alert, Box } from "@mui/material";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user);

  if (!userToken) {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">Unauthorized Path!</Alert>
        <Box component="span" sx={{ p: 2 }}>
          <NavLink to="/login">Login to gain access</NavLink>
        </Box>
      </Stack>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
