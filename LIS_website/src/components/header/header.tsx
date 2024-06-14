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

interface pages {
  id: number;
  page: string;
  link: string;
}

let userPages: pages[] = [
  { id: 1, page: "Đặt hàng", link: "/requestForm" },
  { id: 2, page: "Báo hàng tồn", link: "/requestForm" },
  { id: 3, page: "Lịch sử", link: "/history" },
];

let adminPages: {
  id: number;
  page: string;
  link: string;
}[] = [
  {
    id: 1,
    page: "Đơn hàng",
    link: "/",
  },
  {
    id: 2,
    page: "Tồn kho",
    link: "/",
  },
  {
    id: 3,
    page: "Sản phẩm",
    link: "/property",
  },
];
const Header = () => {
  const router = useRouter();

  const [selectedButton, setSelectedButton] = React.useState(1);

  const handleRoute = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    link: string
  ) => {
    // setPopperAnchorEl(event.currentTarget);
    setSelectedButton(id);
    router.push(link);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Toolbar className={Style.headerContainer}>
          {/* logo */}
          <Box>
            <Image
              priority
              src="/logo-vissan.png"
              width={119}
              height={105}
              alt="Logo"
            />
          </Box>

          {/* button */}
          <Box className={Style.buttonContainer}>
            {(localStorage.getItem("role") === "admin"
              ? adminPages
              : userPages
            ).map((page) => (
              <Button
                key={page.id}
                className={Style.headerBtn}
                onClick={(event) => handleRoute(event, page.id, page.link)}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          {/* Logout button */}
          <Box>
            <Button className={Style.logoutBtn} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
