import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Button, TextField, Box, Typography, Container, Grid, Avatar } from "@mui/material";
import SignUp from "../assets/signUp.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { authToken } from "../api/index";
import { logIn } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  setTimeout(() => {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    emailInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    });
    passwordInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  const onSubmit = async (data) => {
    authToken().then((data) => {
      console.log(data);
    });
    const token = localStorage.getItem("token");

    if (token) {
      console.log("already logged in");
    } else {
      authToken().then((data) => {
        //console.log(data.request_token);
        dispatch(logIn(data.request_token));
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete=""
              autoFocus={true}
              {...register("email")}
              error={errors.email ? true : false}
            ></TextField>
            <Typography color="#d32f2f">{errors.email?.message}</Typography>
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
