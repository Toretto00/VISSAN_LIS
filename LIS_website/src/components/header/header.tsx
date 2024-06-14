"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import Style from "./header.module.scss";

import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
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

let adminPages: pages[] = [
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

  const handleRoute = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    link: string
  ) => {
    router.push(link);
  };

  const handleLogout = () => {
    window.localStorage.clear();
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
            {(window.localStorage.getItem("role") === "admin"
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
