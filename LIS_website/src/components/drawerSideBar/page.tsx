"use client";

import { ReactElement, useState } from "react";

import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import LogoutIcon from "@mui/icons-material/Logout";

import SideBarButon from "./sideBarBtn/page";

interface sidebarBtn {
  name: string;
  icon: ReactElement;
  link: string;
}

const listBtn: sidebarBtn[] = [
  { name: "Dashboards", icon: <DashboardIcon />, link: "/Dashboards" },
  { name: "Invoice", icon: <ReceiptIcon />, link: "/Invoice" },
  { name: "Inventory", icon: <InventoryIcon />, link: "/Inventory" },
  { name: "Price", icon: <PriceChangeIcon />, link: "/Price" },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 4px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerSideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [focus, setFocus] = useState(listBtn[0].name);

  const handleFocus = (name: string) => {
    setFocus(name);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box>
        {listBtn.map((item, index) => (
          <SideBarButon
            key={index}
            name={item.name}
            icon={item.icon}
            link={item.link}
            open={open}
            focus={focus}
            onFocus={handleFocus}
          />
        ))}
      </Box>
      <Divider />
      <Box>
        <SideBarButon
          name="Logout"
          icon={<LogoutIcon />}
          link="/login"
          open={open}
          focus={focus}
          onFocus={handleFocus}
        />
      </Box>
    </Drawer>
  );
};

export default DrawerSideBar;
