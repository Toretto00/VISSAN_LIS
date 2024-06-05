"use client";

import * as React from "react";

import { Transform } from "stream";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Style from "./header.module.scss";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import Popper from "@mui/material/Popper";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useGlobalContext } from "@/app/Context/store";

let pages: {
  id: number;
  page: string;
  link: string;
  children?: { id: number; content: string }[];
}[] = [
  {
    id: 1,
    page: "Home",
    link: "/",
    // children: [
    //   {
    //     id: 1,
    //     content: "Home 1",
    //   },
    //   {
    //     id: 2,
    //     content: "Home 2",
    //   },
    //   {
    //     id: 3,
    //     content: "Home 3",
    //   },
    //   {
    //     id: 4,
    //     content: "Home 4",
    //   },
    //   {
    //     id: 5,
    //     content: "Home 5",
    //   },
    //   {
    //     id: 6,
    //     content: "Home 6",
    //   },
    // ],
  },
  {
    id: 2,
    page: "About",
    link: "/about",
  },
  {
    id: 3,
    page: "Property",
    link: "/property",
    // children: [
    //   {
    //     id: 1,
    //     content: "Properties Grid",
    //   },
    //   {
    //     id: 2,
    //     content: "Properties List",
    //   },
    //   {
    //     id: 3,
    //     content: "Properties Map Grid",
    //   },
    //   {
    //     id: 4,
    //     content: "Properties Map List",
    //   },
    //   {
    //     id: 5,
    //     content: "Properties Fullwidth",
    //   },
    //   {
    //     id: 6,
    //     content: "Single Property-Default",
    //   },
    //   {
    //     id: 7,
    //     content: "Single Property-Fullwidth",
    //   },
    //   {
    //     id: 8,
    //     content: "Single Property-Grid",
    //   },
    // ],
  },
  {
    id: 4,
    page: "Pages",
    link: "/pages",
    // children: [
    //   {
    //     id: 1,
    //     content: "Agencies",
    //   },
    //   {
    //     id: 2,
    //     content: "Agents",
    //   },
    //   {
    //     id: 3,
    //     content: "Agent Details",
    //   },
    //   {
    //     id: 4,
    //     content: "Pricing Table",
    //   },
    //   {
    //     id: 5,
    //     content: "404 Error",
    //   },
    // ],
  },
  {
    id: 5,
    page: "Blog",
    link: "/blog",
    // children: [
    //   {
    //     id: 1,
    //     content: "Blog List",
    //   },
    //   {
    //     id: 2,
    //     content: "Blog Grid",
    //   },
    //   {
    //     id: 3,
    //     content: "Blog Details",
    //   },
    // ],
  },
  {
    id: 6,
    page: "Contact",
    link: "/contact",
  },
];

let propertyBtn: {
  id: number;
  page: string;
  link: string;
}[] = [
  {
    id: 1,
    page: "propertyBtn",
    link: "/propertyBtn",
  },
];
function Header() {
  const router = useRouter();

  const { JWT } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const [popperOpen, setPopperOpen] = React.useState(false);
  // const [popperAnchorEl, setPopperAnchorEl] =
  //   React.useState<null | HTMLElement>(null);
  const [selectedButton, setSelectedButton] = React.useState(1);
  // const [selectedButtonChoose, setSelectedButtonChoose] = React.useState(1);
  // const [isAppBarVisible, setIsAppBarVisible] = React.useState(true);
  // const [isAppBarVisibleScroll, setIsAppBarVisibleScroll] =
  //   React.useState(true);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Button hover

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.pageYOffset;
  //     if (scrollTop === 0) {
  //       setIsAppBarVisible(true);
  //     } else {
  //       setIsAppBarVisible(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.pageYOffset;
  //     if (scrollTop === 0) {
  //       setIsAppBarVisibleScroll(true);
  //     } else if (scrollTop > 0 && scrollTop <= 50) {
  //       setIsAppBarVisibleScroll(false);
  //     } else if (scrollTop > 170) {
  //       setIsAppBarVisibleScroll(true);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    link: string
  ) => {
    // setPopperAnchorEl(event.currentTarget);
    setSelectedButton(id);
    router.push(link);
  };

  const handleButtonClickProperty = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    link: string
  ) => {
    if (JWT !== "") {
      // setPopperAnchorEl(event.currentTarget);
      setSelectedButton(id);
      router.push(link);
    } else router.push("/login");
  };

  // const handleButtonClick_1 = (event: React.MouseEvent<HTMLElement>) => {
  //   const validIds = [1, 3, 4, 5];
  //   const isPageValid = pages.some((page) => validIds.includes(page.id));

  //   if (isPageValid) {
  //     setPopperOpen(true);
  //     setPopperAnchorEl(event.currentTarget);
  //   } else {
  //     setPopperOpen(false);
  //     setPopperAnchorEl(event.currentTarget);
  //   }
  // };

  // const handleButtonClick_2 = () => {
  //   const validIds = [1, 3, 4, 5];
  //   const isPageValid = pages.some((page) => validIds.includes(page.id));

  //   if (isPageValid) {
  //     setPopperOpen(true);
  //   } else {
  //     setPopperOpen(false);
  //   }
  // };
  //menu hover icon
  const [isMenuItemHovered, setIsMenuItemHovered] = React.useState("");

  // function handleMenuItemEnter(childPageId: string) {
  //   setIsMenuItemHovered(childPageId);
  // }

  // function handleMenuItemLeave() {
  //   setIsMenuItemHovered("");
  // }
  const handleAccountButtonClick = () => {
    if (JWT !== "") router.push("/myAccount");
    else router.push("/login");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar className="headerContainer">
          <Box sx={{ "&:hover": { cursor: "pointer" } }}>
            <Image src="/logo_light.svg" width={148} height={39} alt="Logo" />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              // marginLeft: "20px",
              // marginRight: "20px",
              // transition: "none",
            }}
          >
            {pages.map((page) => (
              <div
                key={page.id}
                // onMouseEnter={() => {
                //   handleButtonClick_2();
                // }}
                // onMouseLeave={() => setPopperOpen(false)}
              >
                <Button
                  key={page.id}
                  sx={{
                    textTransform: "none",
                    padding: "30px 15px", // Thêm padding cho nút
                    fontSize: "16px",
                    borderRadius: "0",
                    color: "white",
                    height: "86px", // Đặt chiều cao cố định cho nút
                    "&:hover": {
                      color: "#50f5dc",
                      borderBottom: "3px solid #50ffe4",
                      transition: "none",
                    },
                    "span.MuiTouchRipple-root.css-8je8zh-MuiTouchRipple-root": {
                      borderBottom:
                        selectedButton === page.id
                          ? "3px solid #50ffe4"
                          : "none",
                    },
                  }}
                  onClick={(event) =>
                    handleButtonClick(event, page.id, page.link)
                  }
                  // onMouseEnter={(event) => {
                  //   if (
                  //     page.id === 1 ||
                  //     page.id === 3 ||
                  //     page.id === 4 ||
                  //     page.id === 5
                  //   ) {
                  //     handleButtonClick_1(event);
                  //     setSelectedButtonChoose(page.id);
                  //   } else {
                  //     setPopperOpen(false);
                  //   }
                  // }}
                  // onMouseLeave={() => {
                  //   setPopperOpen(false);
                  // }}
                >
                  {/* {page.id === 1 ||
                  page.id === 3 ||
                  page.id === 4 ||
                  page.id === 5 ? (
                    <>
                      {page.page}
                      <KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />
                    </>
                  ) : (
                    page.page
                  )} */}
                  {page.page}
                </Button>

                {/* <Popper
                  open={popperOpen}
                  anchorEl={popperAnchorEl}
                  placement="top-start"
                  sx={{
                    backgroundColor: "#fff",
                    maxHeight: "400px",
                    overflowY: "auto",
                    width: "250px",
                    padding: "20px 15px",
                    zIndex: "999",
                    border: "1px solid #cdcdcd",
                  }}
                >
                  <div>
                    {pages
                      .filter((page) => page.id === selectedButtonChoose) // Sử dụng selectedButton hoặc selectedButtonChoose
                      .map((selectedPage) =>
                        selectedPage.children?.map((childPage) => (
                          <MenuItem
                            sx={{
                              padding: "10px 0px",
                              fontSize: "15px",
                              lineHeight: "22px",
                              "&:hover": {
                                color: "#00c194",
                                backgroundColor: "white",
                              },
                            }}
                            key={childPage.id}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                              }}
                              onMouseEnter={() =>
                                setIsMenuItemHovered(childPage.id.toString())
                              }
                              onMouseLeave={() => setIsMenuItemHovered("")}
                            >
                              {isMenuItemHovered ===
                                childPage.id.toString() && (
                                <ChevronRightIcon
                                  sx={{
                                    fontSize: "18px",
                                    transition:
                                      "left 0.8s cubic-bezier(0.46, 0.51, 0.62, 0.92)",
                                  }}
                                />
                              )}
                              {childPage.content}
                            </div>
                          </MenuItem>
                        ))
                      )}
                  </div>
                </Popper> */}
              </div>
            ))}
          </Box>

          <Box
            sx={{
              display: { md: "flex", flexDirection: "row" },
              ".MuiBadge-badge": {
                backgroundColor: "#00C194",
                top: "4px",
                right: "11px",
              },
              alignItems: "center",
            }}
          >
            {/* <Badge
              badgeContent={4}
              sx={{
                alignItems: "center",
                display: { md: "none", lg: "flex" },
              }}
            >
              <IconButton
                aria-label="favorite"
                sx={{
                  "&:hover": {
                    backgroundColor: "#00C194",
                    border: "1px solid #00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(180deg)",
                    transition: "transform 0.6s ease",
                  },
                  color: "white",
                  border: "1px solid white",
                  marginRight: "10px",
                  marginLeft: "10px",
                  height: "40px",
                  width: "40px",
                  display: { md: "none", lg: "flex" },
                }}
              >
                <CompareArrowsIcon
                  className="icon-rotate"
                  sx={{
                    height: "20px",
                    width: "20px",
                    alignItems: "center",
                  }}
                />
              </IconButton>
            </Badge>

            <Badge
              badgeContent={4}
              sx={{
                alignItems: "center",
                display: { md: "none", lg: "flex" },
              }}
            >
              <IconButton
                aria-label="favorite"
                sx={{
                  "&:hover": {
                    backgroundColor: "#00C194",
                    border: "1px solid #00C194",
                  },
                  "&:hover .icon-rotate": {
                    transform: "rotateY(180deg)",
                    transition: "transform 0.6s ease",
                  },
                  color: "white",
                  border: "1px solid white",
                  marginRight: "10px",
                  marginLeft: "10px",
                  height: "40px",
                  width: "40px",
                  display: { md: "none", lg: "flex" },
                }}
              >
                <FavoriteBorderIcon
                  className="icon-rotate"
                  sx={{
                    height: "20px",
                    width: "20px",
                    alignItems: "center",
                  }}
                />
              </IconButton>
            </Badge> */}

            <IconButton
              aria-label="account"
              sx={{
                "&:hover": {
                  backgroundColor: "#00C194",
                  border: "1px solid #00C194",
                },
                "&:hover .icon-rotate": {
                  transform: "rotateY(180deg)",
                  transition: "transform 0.6s ease",
                },
                color: "white",
                border: "1px solid white",
                marginLeft: "10px",
                marginRight: "10px",
                height: "40px",
                width: "40px",
              }}
              onClick={handleAccountButtonClick}
            >
              <PersonOutlineIcon
                className="icon-rotate"
                sx={{ height: "20px", width: "20px" }}
              />
            </IconButton>

            {propertyBtn.map((property) => (
              <Button
                key={property.id}
                sx={{
                  display: { xs: "none", md: "flex" },
                  borderRadius: "25px",
                  marginLeft: "4px",
                  marginRight: "4px",
                  fontSize: "15px",
                  backgroundColor: "#00C194",
                  height: "44px",
                  "&:hover": {
                    backgroundColor: "#00A47E",
                  },
                  "& .icon-rotate": {
                    transform: "rotate(0deg)", // Initial state (no rotation)
                    transition: "transform 0.3s ease", // Define the animation transition
                    borderRadius: "50%", // Hình dạng hình tròn
                    backgroundColor: "white", // Màu nền của biểu tượng
                  },
                  "& span.MuiButton-startIcon.MuiButton-iconSizeMedium.css-1d6wzja-MuiButton-startIcon":
                    {
                      border: "2px solid transparent",
                      paddingRight: "7px",
                      paddingLeft: "4px",
                      alignItems: "center",
                    },
                  "&:hover .icon-rotate": {
                    transform: "rotate(180deg)",
                    transition: "transform 0.3s ease",
                  },
                  "& .icon-rotate span": {
                    border: "2px solid #00C194", // Đường viền dày cho phần span
                  },
                  textTransform: "none",
                  fontWeight: "600",
                }}
                variant="contained"
                startIcon={
                  <AddIcon
                    className="icon-rotate"
                    sx={{
                      height: "16px",
                      width: "16px",
                      color: "#00c194",
                      fontSize: "large !important",
                    }}
                  />
                }
                onClick={(event) =>
                  handleButtonClickProperty(event, property.id, property.link)
                }
              >
                Add new sample
              </Button>
            ))}

            <IconButton
              sx={{
                display: { md: "none" },
                color: "white",
                backgroundColor: "#00C194",
                marginLeft: "4px",
                marginRight: "4px",
                "&:hover": {
                  backgroundColor: "#00A47E",
                },
                height: "36px",
                width: "36px",
              }}
            >
              <AddIcon sx={{ height: "16px", width: "16px" }} />
            </IconButton>

            <IconButton
              sx={{
                display: { md: "none" },
                color: "white",
              }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              sx={{ overFlow: "auto" }}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{
                horizontal: "left",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} sx={{ width: "100vw" }}>
                  {page.page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
