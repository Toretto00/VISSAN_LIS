"use client";

import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Style from "./login.module.scss";

import api from "../api/client";

import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import WavingHandIcon from "@mui/icons-material/WavingHand";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsernameLogin] = useState("");
  const [password, setPasswordLogin] = useState("");

  const handleLogin = () => {
    api
      .post("Users/Login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const params = new URLSearchParams(searchParams);
        params.set("requestType", "1");
        if (typeof window !== "undefined") {
          localStorage.setItem("userID", res.data.id);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("store", res.data.store);
        }
        resetValue();
        res.data.role === "user"
          ? router.push(`requestForm?${params.toString()}`)
          : router.push("Dashboards");
      });
  };

  const resetValue = () => {
    setUsernameLogin("");
    setPasswordLogin("");
  };

  return (
    <div className={Style.container}>
      <Grid container className={Style.form}>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8}>
          <Box className={Style.content}>
            <Typography variant="h4" component="h4">
              Welcome to Vissan!
              <WavingHandIcon sx={{ marginLeft: "8px" }} />
            </Typography>
            <Typography className={Style.title}>
              Please sign-in to your account and start the adventure
            </Typography>
            <Box>
              <Typography className={Style.title}>Username</Typography>
              <TextField
                required
                label="Username"
                fullWidth
                defaultValue={username}
                value={username}
                onChange={(e) => setUsernameLogin(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleLogin();
                }}
              />
              <Typography className={Style.title}>Password</Typography>
              <TextField
                required
                label="Password"
                type="password"
                fullWidth
                defaultValue={password}
                value={password}
                onChange={(e) => setPasswordLogin(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleLogin();
                }}
              />
            </Box>
            <Box className={Style.loginAction}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  sx={{ color: "rgb( 47 43 61 / 0.7)" }}
                />
              </FormGroup>
              <Button className={Style.button}>Forgot password?</Button>
            </Box>
            <Button
              variant="contained"
              fullWidth
              className={Style.button}
              onClick={handleLogin}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleLogin();
              }}
            >
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default Login;
