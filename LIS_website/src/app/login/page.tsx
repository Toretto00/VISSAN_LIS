"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Style from "./login.module.scss";
import api from "../api/client";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../Context/store";
import LoadingPage from "../../components/loadingPage/loading";
import { Button } from "@mui/material";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsernameLogin] = useState("");
  const [password, setPasswordLogin] = useState("");

  const { SETJWT, SETUSERNAME, SETPASSWORD } = useGlobalContext();

  useEffect(() => {
    // setLoading(true);
    if (localStorage.getItem("userID")) router.push("requestForm");
  }, []);

  const handleLogin = () => {
    api
      .post("Users/Login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("userID", res.data.id);
          localStorage.setItem("role", res.data.role);
        }
        resetValue();
        router.push("requestForm");
        setLoading(true);
      });
    // fetch("./data/User.json")
    //   .then(function (res) {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     data.forEach((element: any) => {
    //       if (element.username === username) {
    //         if (element.password === password) {
    //           localStorage.setItem("storeID", element.storeID);
    //           setLoading(true);
    //           SETJWT(element.role);
    //           SETUSERNAME(username);
    //           SETPASSWORD(password);
    //           resetValue();
    //           router.push("requestForm");
    //         } else {
    //         }
    //       }
    //     });
    //   })
    //   .catch(function (err) {
    //     console.log(err, " error");
    //   });
  };

  const resetValue = () => {
    setUsernameLogin("");
    setPasswordLogin("");
    setLoading(false);
  };

  // const handleLogin = () => {
  //   if (username === "" || password === "") return;
  //   setLoading(true);
  //   api
  //     .post(
  //       "login/authorize",
  //       querystring.stringify({
  //         username: username, //gave the values directly for testing
  //         password: password,
  //         grant_type: "password",
  //       }),
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     )
  //     .then((res?) => {
  //       if (res?.data) {
  //         SETJWT(res.data.access_token);
  //         SETUSERNAME(username);
  //         SETPASSWORD(password);
  //         router.push("myAccount");
  //       }
  //     });
  // };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div
          style={{
            // minHeight: "1065px",
            backgroundColor: "#fff",
          }}
          className="main-container"
        >
          <Container
            maxWidth="xl"
            sx={{
              maxWidth: {
                xs: "738px",
                md: "990px",
                lg: "1220px",
              },
              backgroundColor: "#fff",
              // marginTop: "86px",
              minHeight: "100vh",
              padding: { xs: "column", lg: "row", md: "0px" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              className={Style.elementColumn}
              sx={{
                width: { xs: "100%", md: "100%", sm: "100%" },
                padding: { xs: "20px", sm: "20px" },
                paddingRight: { md: "0px", lg: "0px" },
              }}
            >
              <Box className={Style.widgetWrap_3}>
                <Box>
                  <Box>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          md: "100%",
                          sm: "100%",
                        },
                      }}
                      className={Style.elementColumn}
                    >
                      <Box className={Style.widgetWrap_2}>
                        <Box
                          className={Style.elementElement}
                          sx={{
                            marginBottom: "50px",
                          }}
                        >
                          <h2 className={Style.mainTitle}>Login</h2>
                        </Box>
                        <Box className={Style.elementElement}>
                          <Box className={Style.ffTContainer}>
                            <Box className={Style.fluentForm}>
                              <div className={Style.inputLabel}>
                                <label className={Style.ff1Title}>
                                  Username
                                </label>
                              </div>
                              <div>
                                <input
                                  required
                                  type="text"
                                  name="user"
                                  id={Style.namesFirstName}
                                  className={Style.elFormControl}
                                  aria-invalid="false"
                                  aria-required="false"
                                  value={username}
                                  onChange={(e) =>
                                    setUsernameLogin(e.target.value)
                                  }
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") handleLogin();
                                  }}
                                />
                              </div>
                            </Box>
                            <Box className={Style.fluentForm}>
                              <div className={Style.inputLabel}>
                                <label className={Style.ff1Title}>
                                  Password
                                </label>
                              </div>
                              <div className={Style.inputContent}>
                                <input
                                  required
                                  type="password"
                                  name="names[first-name]"
                                  id={Style.namesFirstName}
                                  className={Style.elFormControl}
                                  aria-invalid="false"
                                  aria-required="false"
                                  value={password}
                                  onChange={(e) =>
                                    setPasswordLogin(e.target.value)
                                  }
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") handleLogin();
                                  }}
                                />
                              </div>
                            </Box>
                          </Box>
                          <Box className={Style.wrapSubmit}>
                            <Box className={Style.submitBtn}>
                              <Button
                                variant="contained"
                                // className={Style.btnSubmit}
                                onClick={(e) => handleLogin()}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") handleLogin();
                                }}
                              >
                                Login
                              </Button>
                            </Box>
                            {/* <Box className={Style.checkBox}>
                              <input
                                className={Style.btnCheckBox}
                                id="CheckBox"
                                type="checkbox"
                              />
                              <label className={Style.textCheckBox}>
                                {" "}
                                Remember Me
                              </label>
                            </Box> */}
                          </Box>
                          {/* <div>
                            <a className={Style.txtForgotPass} href="">
                              Forgot your password?
                            </a>
                            <Box className={Style.submitBtn}>
                              <button
                                className={Style.btnSubmit}
                                onClick={() => {
                                  setLoading(true);
                                  router.push("/register");
                                }}
                              >
                                Sign up
                              </button>
                            </Box>
                          </div> */}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      )}
    </>
  );
};

export default Login;
