"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";

import Style from "./header.module.scss";

import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
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

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("requestType");

  const buttonClass = `${Style.headerBtn} ${Style.onFocus}`;

  const handleRoute = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    link: string
  ) => {
    router.push(link + "?requestType=" + id);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") sessionStorage.clear();
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
                className={
                  search === page.id.toString() ? buttonClass : Style.headerBtn
                }
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
