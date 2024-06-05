"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { Divider } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import "./page.css";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import YouTube from "react-youtube";

function About() {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Tính toán backgroundPositionY dựa trên scrollPosition với sự thay đổi 1px khi lăn chuột xuống
  const backgroundPositionY1 = `center ${900 - scrollPosition * 0.4}px`;
  const backgroundPositionY2 = `center ${900 - scrollPosition * 0.6}px`;
  const [showVideo, setShowVideo] = React.useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
    const video = document.getElementById("video");
    if (video) {
      video.style.display = "block";
    }
  };

  const handleVideoClose = () => {
    const video = document.getElementById("video");
    if (video) {
      video.style.display = "none";
    }
  };
  return (
    <div
      style={{
        minHeight: "3065px",
        backgroundColor: "#fff",
      }}
      className="main-container"
    >
      <Container
        maxWidth="xl"
        sx={{
          maxWidth: { xs: "738px", md: "950px", lg: "1220px" },
          backgroundColor: "#fff",
          marginTop: "86px",
          minHeight: "100vh",
          padding: { xs: "column", lg: "row", md: "0px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            zIndex: "100",
            padding: "30px 0px",
            borderBottom: " 1px solid #deede9 ",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#878cab",
              }}
            >
              <>
                <a
                  href="/"
                  style={{
                    color: "#878c9f",
                    textDecoration: "none",
                  }}
                >
                  Home
                </a>
                <ChevronRightIcon
                  sx={{
                    fontSize: "18px",
                    marginRight: "7px",
                    marginLeft: "7px",
                  }}
                />
              </>
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#00c6a9",
              }}
            >
              About
            </div>
          </div>
        </Box>
        <Box
          sx={{
            width: "100%",
            paddingTop: "120px",
            paddingBottom: "120px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                lg: "row",
                md: "row",
                sm: "column",
              },
              alignItems: {
                xs: "center",
                sm: "center",
                md: "flex-start !important",
              },
            }}
          >
            <Image
              src="/about-meet.jpg"
              alt="Logo"
              width={610}
              height={460}
              className="image-lg"
            />
            <Box
              sx={{
                flexGrow: 1,
                paddingRight: "10px",
                ".MuiBox-root.css-1a0qsji":
                  "-webkit-align-items: flex-start !important",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: {
                    xs: "15px",
                    sm: "15px",
                    md: "25px",
                    lg: "60px",
                  },
                  paddingTop: { xs: "20px", sm: "20px", md: "5px", lg: "17px" },
                }}
              >
                <Grid xs={10}>
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="element-1"
                  >
                    <h1
                      style={{
                        fontSize: "16px",
                        lineHeight: "26px",
                        fontWeight: "500px",
                        letterSpacing: "1.1px",
                        color: "#00c194",
                        marginBottom: "10px",
                      }}
                    >
                      ABOUT US
                    </h1>
                    <h2
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#212121",
                        lineHeight: "1.2",
                        width: "80%",
                      }}
                    >
                      {/* We're on a Mission to Change */}
                      View of RealEstate Field.
                    </h2>
                    <p
                      style={{
                        width: "100%",
                        fontSize: "15px",
                        color: "#70778a",
                        lineHeight: "1.5",
                        fontWeight: "500",
                      }}
                    >
                      when an unknown printer took a galley of type and
                      scrambled it to make type specimen bookt has survived not
                      only five centuries alsoey jequery the leap into
                      electronic typesetting.
                    </p>
                  </div>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: "20px",
                    flexDirection: {
                      xs: "column",
                      lg: "row",
                      md: "row",
                      sm: "column",
                    },
                  }}
                >
                  <Grid
                    xs={5}
                    sx={{
                      width: { xs: "100%", lg: "50%", md: "50%", sm: "100%" },
                      padding: {
                        xs: "0px",
                        lg: "10px",
                        md: "10px",
                        sm: "10px",
                      },
                    }}
                  >
                    <div>
                      <Image
                        src="/Modern-Villa-1.svg"
                        alt="Logo"
                        width={60}
                        height={57}
                      />
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "22px",
                              margin: "15px 0px 1px 0px",
                              fontWeight: "500",
                              color: "#212121",
                              width: "100%",
                            }}
                          >
                            Modern Villa
                          </h2>
                        </Box>
                        <Box>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "#70778B",
                              marginTop: "10px",
                            }}
                          >
                            when unknown printer took galley of type and
                            scrambled.
                          </p>
                        </Box>
                      </Box>
                    </div>
                  </Grid>
                  <Grid
                    xs={5}
                    sx={{
                      width: { xs: "100%", lg: "50%", md: "50%", sm: "100%" },
                      padding: {
                        xs: "0px",
                        lg: "10px",
                        md: "10px",
                        sm: "10px",
                      },
                    }}
                  >
                    <div>
                      <Image
                        src="/home_hand_3-1.svg"
                        alt="Logo"
                        width={59}
                        height={63}
                      />
                      <Box>
                        <Box>
                          <h2
                            style={{
                              fontSize: "22px",
                              margin: "15px 0px 1px 0px",
                              fontWeight: "500",
                              color: "#212121",
                            }}
                          >
                            Secure Payment
                          </h2>
                        </Box>
                        <Box>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "#70778B",
                              marginTop: "10px",
                            }}
                          >
                            when unknown printer took galley of type and
                            scrambled.
                          </p>
                        </Box>
                      </Box>
                    </div>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                lg: "row",
                md: "row",
                sm: "column",
              },
              alignItems: {
                xs: "center",
                sm: "center",
                md: "flex-start !important",
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                paddingRight: "10px",
                ".MuiBox-root.css-1a0qsji":
                  "-webkit-align-items: flex-start !important",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: {
                    xs: "15px",
                    sm: "15px",
                    md: "25px",
                    lg: "0px",
                  },
                  paddingTop: { xs: "20px", sm: "20px", md: "5px", lg: "40px" },
                  width: "100%",
                }}
              >
                <Grid xs={10} sx={{ width: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="element-1"
                  >
                    <h1
                      style={{
                        fontSize: "16px",
                        lineHeight: "26px",
                        fontWeight: "500px",
                        letterSpacing: "1.1px",
                        color: "#00c194",
                        marginBottom: "10px",
                      }}
                    >
                      COMPANY POWER
                    </h1>
                    <h2
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#212121",
                        lineHeight: "1.2",
                        width: "60%",
                      }}
                      className="content"
                    >
                      The Core Company Values Of Our main Goal
                    </h2>
                    <p
                      style={{
                        width: "85%",
                        fontSize: "15px",
                        color: "#70778a",
                        lineHeight: "1.5",
                        fontWeight: "500",
                      }}
                    >
                      when an unknown printer took a galley of type and
                      scrambled it to make type specimen bookt has survived.
                    </p>
                  </div>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: "20px",
                    flexDirection: {
                      xs: "column",
                      lg: "column",
                      md: "column",
                      sm: "column",
                    },
                  }}
                >
                  <Grid
                    xs={5}
                    sx={{
                      width: { xs: "100%", lg: "85%", md: "100%", sm: "100%" },
                      height: "77px",
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#212121",
                              width: "100%",
                              marginBottom: "10px",
                            }}
                          >
                            Modern Technology
                          </h2>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={59}
                            sx={{
                              borderRadius: "100px",
                              backgroundColor: "#dceeea",
                              height: "7px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#00c194 !important",
                              },
                            }}
                            className="progress-1"
                          />

                          <div className="elementor-progress-percentage">
                            <div className="wrap place-59">
                              <span className="percentage-59">59%</span>
                              <div className="59">
                                <span className="shape"></span>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </Box>
                    </div>
                  </Grid>
                  <Grid
                    xs={5}
                    sx={{
                      width: { xs: "100%", lg: "85%", md: "100%", sm: "100%" },
                      height: "77px",
                    }}
                  >
                    <div>
                      <Box>
                        <Box>
                          <h2
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#212121",
                              marginBottom: "10px",
                            }}
                          >
                            Tax Solution Area
                          </h2>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={79}
                            sx={{
                              borderRadius: "100px",
                              backgroundColor: "#dceeea",
                              height: "7px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#00c194 !important",
                              },
                            }}
                            className="progress-2"
                          />
                          <div className="elementor-progress-percentage">
                            <div className="wrap place-79">
                              <span className="percentage-79">79%</span>
                              <div className="79">
                                <span className="shape"></span>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </Box>
                    </div>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <div className="image-container">
              <Image
                src="/about-meet-2.jpg"
                alt="Logo"
                width={610}
                height={460}
                className="image-lg"
                loading="lazy"
              />
              <div className="play-button">
                <a
                  className="popup-youtube video-popup-icon"
                  onClick={toggleVideo}
                >
                  <span className="triangle"></span>
                  <span
                    className="rt-ripple-effect"
                    style={{
                      boxShadow:
                        "0 0 0 20px rgb(9 32 56 / 50%), 0 0 0 30px rgb(9 32 56 / 40%), 0 0 0 40px rgb(9 32 56 / 30%)",
                    }}
                  ></span>
                </a>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
      <div
        className="video"
        id="video"
        onClick={() => {
          handleVideoClose();
        }}
      >
        {showVideo && (
          <YouTube
            videoId="XHOmBV4js_E"
            style={{
              height: "740px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
            }}
            opts={{
              height: "500",
              width: "900",
              playerVars: {
                autoplay: 1, // Đặt giá trị này thành 1 để tự động phát video khi trang tải
              },
            }}
          />
        )}
      </div>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: { sm: "400px !important", md: "590px !important" },
          backgroundImage:
            "url(https://homlisti.tpblog.net/wp-content/uploads/2021/08/promo-bg-1.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: {
            sm: backgroundPositionY1,
            md: backgroundPositionY2,
          },
          padding: {
            xs: "0px !important",
            sm: "0px !important",
            md: "0px !important",
            lg: "",
          },
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          maxWidth: { lg: "100%" },
        }}
      >
        <Box
          sx={{
            minHeight: {
              xs: "450px",
              sm: "450px",
              md: "590px    ",
              lg: "590px",
            },
            maxWidth: "1240px",
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            justifyContent: {
              sm: "flex-start !important",
              md: "flex-start !important",
            },
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", lg: "38%", md: "38%", sm: "100%" },
              className: ".slideInUp",
              position: "relative",
              minHeight: "1px",
              display: "flex",
              marginTop: { xs: "50px", sm: "55px", md: "20px" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: {
                  xs: "15px 40px 15px 40px",
                  sm: "15px 40px 15px 40px",
                  md: "40px 40px 40px 50px",
                  lg: "40px 50px 45px 50px",
                },
                transition:
                  "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;",
                display: "flex",
                position: "relative",
                width: "100%",
                flexWrap: "wrap",
                alignContent: "flex-start",
                maxHeight: { xs: "235px", sm: "235px", md: "", lg: "" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  marginBottom: "26px",
                }}
              >
                <div className="title-inner-wrap">
                  <div className="sub-title-wrap">
                    <span className="sub-title">
                      <FiberManualRecordIcon
                        sx={{
                          marginRight: "5px",
                          fontSize: "12px",
                          fontWeight: "900",
                          color: "#00c194",
                        }}
                      />
                      LET{"'"}S TAKE A TOUR
                    </span>
                  </div>
                  <h2 className="main-title">
                    Search Property Smarter,
                    <br />
                    Quicker & Anywhere
                  </h2>
                </div>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="play-button-2">
                  <div className="rt-video-icon">
                    <div className="video-icon-inner">
                      <div className="icon-left">
                        <div className="play-button-title">
                          <a
                            className="popup-youtube video-popup-icon-2"
                            onClick={toggleVideo}
                          >
                            <span className="triangle color-triangle"></span>
                            <span
                              className="rt-ripple-effect"
                              style={{
                                boxShadow:
                                  "0 0 0 20px rgb(0 193 148/ 50%), 0 0 0 30px rgb(0 193 148 / 40%), 0 0 0 40px rgb(0 193 148 / 30%)",
                              }}
                            ></span>
                          </a>
                        </div>
                      </div>
                      <div className="icon-right">
                        <a className="popup-2-youtube" onClick={toggleVideo}>
                          Play Video
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: "62%", md: "62%", sm: "100%" },
            }}
          >
            <div className="widget-wrap">
              <div className="element-widget">
                <div className="widget-container">
                  <div className="title-wrapper">
                    <div className="bg-title-wrapper">
                      <span className="background-title">Property For All</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          padding: "90px 0px 50px 0px",
          minHeight: "593px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            maxWidth: "1240px",
            display: "flex",
            marginRight: "auto",
            marginLeft: "auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: { sm: "100%" },
              position: "relative",
              minHeight: "1px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                position: "relative",
                width: "100%",
                flexWrap: "wrap",
                alignContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    margin: "0px",
                    padding: "0px 0px 42px 0px",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      position: "relative",
                      marginBottom: "40px",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                      }}
                    >
                      <div className="top-sub-title">EXPERTISE IS HERE</div>
                      <h2 className="main-title-2">Our Exclusive Agents</h2>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              maxWidth: "1240px",
              display: "flex",
              marginRight: "auto",
              marginLeft: "auto",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  width: "100%",
                  alignContent: "flex-start",
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "150%", sm: "150%", md: "25%", lg: "25%" },
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  className="main-contact"
                >
                  <Box
                    sx={{
                      marginBottom: "30px",
                    }}
                    className="scaleUpCenter"
                  >
                    <div className="item-img">
                      <Image
                        width="207"
                        height="225"
                        src="/agent-1.png"
                        alt="anh1"
                        className="setup-img"
                      />
                      <div className="category-box">
                        <div className="item-category">08 Listing</div>
                      </div>
                    </div>
                    <div className="item-content">
                      <div className="item-title">
                        <h3 className="agent-name"> Andren Willium</h3>
                        <h4 className="item-subtitle">
                          <Link href="/about" className="address-subtitle">
                            Sunshine
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="item-contact">
                      <div className="item-icon">
                        <LocalPhoneIcon
                          sx={{
                            width: "16px",
                            height: "18px",
                          }}
                        />
                      </div>
                      <div className="item-phn-no">Call: +121 511 4522</div>
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "150%", sm: "150%", md: "25%", lg: "25%" },
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  className="main-contact"
                >
                  <Box
                    sx={{
                      marginBottom: "30px",
                    }}
                    className="scaleUpCenter"
                  >
                    <div className="item-img">
                      <Image
                        width="237"
                        height="255"
                        src="/agent-2.png"
                        alt="anh1"
                        className="setup-img"
                      />
                      <div className="category-box">
                        <div className="item-category">06 Listing</div>
                      </div>
                    </div>
                    <div className="item-content">
                      <div className="item-title">
                        <h3 className="agent-name"> Andren Willium</h3>
                        <h4 className="item-subtitle">
                          <Link href="/about" className="address-subtitle">
                            Sunshine
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="item-contact">
                      <div className="item-icon">
                        <LocalPhoneIcon
                          sx={{
                            width: "16px",
                            height: "18px",
                          }}
                        />
                      </div>
                      <div className="item-phn-no">Call: +121 511 4522</div>
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "150%", sm: "150%", md: "25%", lg: "25%" },
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  className="main-contact"
                >
                  <Box
                    sx={{
                      marginBottom: "30px",
                    }}
                    className="scaleUpCenter"
                  >
                    <div className="item-img">
                      <Image
                        width="237"
                        height="255"
                        src="/agent-3.png"
                        alt="anh1"
                        className="setup-img"
                      />
                      <div className="category-box">
                        <div className="item-category">11 Listing</div>
                      </div>
                    </div>
                    <div className="item-content">
                      <div className="item-title">
                        <h3 className="agent-name"> Andren Willium</h3>
                        <h4 className="item-subtitle">
                          <Link href="/about" className="address-subtitle">
                            Sunshine
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="item-contact">
                      <div className="item-icon">
                        <LocalPhoneIcon
                          sx={{
                            width: "16px",
                            height: "18px",
                          }}
                        />
                      </div>
                      <div className="item-phn-no">Call: +121 511 4522</div>
                    </div>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "150%", sm: "150%", md: "25%", lg: "25%" },
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  className="main-contact"
                >
                  <Box
                    sx={{
                      marginBottom: "30px",
                    }}
                    className="scaleUpCenter"
                  >
                    <div className="item-img">
                      <Image
                        width="237"
                        height="255"
                        src="/agent-4.png"
                        alt="anh1"
                        className="setup-img"
                      />
                      <div className="category-box">
                        <div className="item-category">07 Listing</div>
                      </div>
                    </div>
                    <div className="item-content">
                      <div className="item-title">
                        <h3 className="agent-name"> Andren Willium</h3>
                        <h4 className="item-subtitle">
                          <Link href="/about" className="address-subtitle">
                            Sunshine
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="item-contact">
                      <div className="item-icon">
                        <LocalPhoneIcon
                          sx={{
                            width: "16px",
                            height: "18px",
                          }}
                        />
                      </div>
                      <div className="item-phn-no">Call: +121 511 4522</div>
                    </div>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          border: "1px solid #E8E8E8",
          transition:
            "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
          padding: "70px 0px 80px 0px",
          position: "relative",
          marginLeft: "0px",
          maxWidth: "100% !important",
          display: "flex",
        }}
      >
        <Box
          sx={{
            maxWidth: "1240px",
            display: "flex",
            marginRight: "auto",
            marginLeft: "auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              minHeight: "1px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                flexWrap: "wrap",
                alignContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  zIndex: "1",
                  display: "flex",
                  transitionProperty: "transform",
                }}
              >
                <div className="swiper-slide slide1">
                  <img
                    src="/client-logo-1.svg"
                    alt="hình 1"
                    width="180"
                    height="100"
                    className="swiper-slide-img"
                  />
                </div>
                <div className="swiper-slide slide2">
                  <img
                    src="/client-logo-2.svg"
                    alt="hình 1"
                    width="180"
                    height="100"
                    className="swiper-slide-img"
                  />
                </div>
                <div className="swiper-slide slide3">
                  <img
                    src="/client-logo-3.svg"
                    alt="hình 1"
                    width="180"
                    height="100"
                    className="swiper-slide-img"
                  />
                </div>
                <div className="swiper-slide slide4">
                  <img
                    src="/client-logo-4.svg"
                    alt="hình 1"
                    width="180"
                    height="100"
                    className="swiper-slide-img"
                  />
                </div>
                <div className="swiper-slide slide5">
                  <img
                    src="/client-logo-5.svg"
                    alt="hình 1"
                    width="180"
                    height="100"
                    className="swiper-slide-img"
                  />
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          transition:
            "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;",
          padding: "50px 0px 50px 0px",
          position: "relative",
          marginBottom: { xs: "55px" },
        }}
      >
        <Box
          sx={{
            position: "static",
            maxWidth: "1240px",
            display: "flex",
            marginRight: " auto",
            marginLeft: "auto",
            flexDirection: { xs: "column", sm: "column ", md: "row" },
          }}
        >
          <Box
            sx={{
              position: "static",
              width: { sm: "100%", md: "37.833%" },
              minHeight: "1px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                alignContent: "center",
                alignItems: "center",
                position: "static",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  marginBottom: "0px",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="elementor-widget-container">
                  <div className="section-title-wrapper">
                    <div className="title-inner-wrapper">
                      <h2 className="main-title">Sign up for newsletter </h2>
                      <div className="description">
                        <p>Get latest news and update</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="elementor-widget-container-img"
                >
                  <Image
                    width="357"
                    height="131"
                    src="/ct-layer-2.png"
                    className="rt-image-placeholder"
                    alt="Animated Image"
                    decoding="async"
                    loading="lazy"
                    title=""
                  />
                </div>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "static",
              width: { sm: "100%", md: "62.167%" },
              minHeight: "1px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                alignContent: "center",
                alignItems: "center",
                position: "static",
                padding: "10px",
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <div className="input-container">
                <TextField
                  id="outlined-basic"
                  label="Enter e-mail address"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    position: "relative",
                  }}
                />
                <Button variant="contained" className="subscribe-btn">
                  SUBSCRIBE
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default About;
