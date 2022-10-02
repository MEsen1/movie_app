import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CssBaseline,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  Alert,
  Snackbar,
} from "@mui/material";
import SignUp from "../assets/signUp.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { authToken } from "../api/index";
import { isLoggedIn, loadAuthToken, logIn } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  const loggedIn = dispatch(isLoggedIn());

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Username is required")

      .max(40, "Username must not exceed 40 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value) => {
    let { data, isSuccess, message } = await authToken(value.name, value.password);
    console.log(`${value.name} == ${value.password}`);
    //console.log(data.token);
    console.log(data);

    if (isSuccess) {
      dispatch(logIn(data.token));
      navigate("/");
    } else {
      setAlert(message);
    }
  };

  const handleClose = () => {
    setAlert("");
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={alert !== undefined && alert !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alert}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, width: 200, height: 200, bgcolor: "#0072b1" }} src={SignUp}></Avatar>
        <Typography variant="h5">Sign In</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete=""
              autoFocus={true}
              {...register("name")}
              error={errors.name ? true : false}
            ></TextField>
            <Typography color="#d32f2f">{errors.name?.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={errors.email ? true : false}
            />
            <Typography color="#d32f2f">{errors.password?.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              //type="submit"
              fullWidth
              id="loginButton"
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#2977c9",
                borderRadius: "28px",
                lineHeight: 3,

                ":hover": { backgroundColor: "#004182", transitionDuration: "167ms", cursor: "pointer" },
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
