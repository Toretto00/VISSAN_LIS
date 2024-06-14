"use client";

import {
  Backdrop,
  CircularProgress,
  TextField,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./Register.scss";
import "../globals.css";
import api from "../api/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState("none");

  const router = useRouter();

  const handleSignUp = () => {
    api
      .post(
        `/Users?username=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}&location_id=172&address=${address}&phone=${phone}&email=${email}`
      )
      .then((res) => {
        if (res) {
          setDisplay("block");
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login">
        <Container maxWidth="lg">
          <Backdrop sx={{ color: "#fff" }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="hello">
            <h2>Homlisti!</h2>
            <Typography>
              To connect to your account, enter your email address and your
              password{" "}
            </Typography>
          </div>

          <Box className="form">
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="formChild"
            />
            <TextField
              required
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formChild"
            />
            <TextField
              required
              label="Confirm password"
              type="password"
              className="formChild"
            />
            <TextField
              required
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="formChild"
            />
            <TextField
              required
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="formChild"
            />
            <TextField
              required
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="formChild"
            />
            <TextField
              required
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="formChild"
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formChild"
            />
          </Box>

          <Typography className="sign-up">
            Already have an account?
            <Link href="/login">
              {" "}
              Log in
              {/* <Typography sx={{ color: "#00a47e", width: "fit-content" }}>
              </Typography> */}
            </Link>
          </Typography>

          <Button
            fullWidth
            variant="contained"
            className="btn--submit"
            onClick={handleSignUp}
            type="submit"
          >
            Register
          </Button>
          <Alert severity="success" sx={{ display: display }}>
            This is a success alert — check it out!
          </Alert>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Register;
