"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import Style from "./header.module.scss";

import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
interface pages {
  id: number;
  page: string;
  link: string;
}

let userPages: pages[] = [
  // { id: 1, page: "Đặt hàng", link: "/requestForm" },
  { id: 2, page: "Báo hàng tồn", link: "/requestForm" },
  // { id: 3, page: "Lịch sử", link: "/history" },
];

// let adminPages: pages[] = [
//   {
//     id: 1,
//     page: "Đơn hàng",
//     link: "/",
//   },
//   {
//     id: 2,
//     page: "Tồn kho",
//     link: "/",
//   },
//   {
//     id: 3,
//     page: "Sản phẩm",
//     link: "/property",
//   },
// ];

var role: string | null;

const Header = () => {
  const router = useRouter();

  useEffect(() => {
    role = localStorage.getItem("role");
  }, []);

  const handleRoute = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    link: string
  ) => {
    router.push(link);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.clear();
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
              width={84}
              height={70}
              alt="Logo"
            />
          </Box>

          {/* button */}
          <Box className={Style.buttonContainer}>
            {userPages.map((page) => (
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
              <LogoutIcon sx={{ mr: "4px" }} />
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
