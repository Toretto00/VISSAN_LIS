"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Grid,
  Button,
  TextField,
} from "@mui/material";

import Style from "./myAccount.module.scss";
import api from "../api/client";

import { useGlobalContext } from "../Context/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

const MyAccount = () => {
  const [userData, setUserData] = useState<any>({
    id: 4,
    first_name: "Bao",
    last_name: "Phan",
    username: "Toretto",
    contact: {
      id: 1,
      location: {
        term_id: 172,
        name: "New Jersey",
        slug: "new-jersey",
        count: 6,
      },
      address: "South stump tavern road, 42",
      phone: "+052015698546",
      whatsapp_number: "+052015698546",
      email: "tom_steven@gmail.com",
    },
    account: {
      id: 1,
      username: "phanchibao007@gmail.com",
      password: "Pcb0941819910",
    },
  });

  const { USERNAME, SETUSERNAME, SETPASSWORD, SETJWT } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    api
      .get(`/user/id?username=${USERNAME}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={Style.wrapper}>
        {/* Breadcrumbs */}
        <Container maxWidth="lg">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className={Style.breadCrumbsContainer}
          >
            <Link
              underline="none"
              color="inherit"
              href="/"
              className={Style.breadCrumbsLink}
            >
              Home
            </Link>
            <Typography
              color="var(--primary-color)"
              className={Style.breadCrumbsLink}
            >
              My Account
            </Typography>
          </Breadcrumbs>
        </Container>

        <Divider />

        <Container maxWidth="lg" className={Style.mainContent}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={3} lg={3} className={Style.sidebar}>
              <Button variant="contained">Account details</Button>
              <Button
                className={Style.logout}
                onClick={() => {
                  SETUSERNAME("");
                  SETPASSWORD("");
                  SETJWT("");
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Username</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.username} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>First name</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.first_name} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Last name</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.last_name} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>E-mail address</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.contact.email} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Phone</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.contact.phone} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography>Address</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <TextField fullWidth value={userData.contact.address} />
                </Grid>
              </Grid>
              <Grid container className={Style.widgetWrap_3}>
                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <Button fullWidth variant="contained">
                    Update Account
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default MyAccount;
