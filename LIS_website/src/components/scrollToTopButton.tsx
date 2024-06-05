"use client";

import React, { useCallback, useState, useEffect } from "react";

import { IconButton, useScrollTrigger, Zoom } from "@mui/material";

import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const ScrollToTopButton = () => {
  const [trigger, setTrigger] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Zoom in={trigger}>
      <IconButton
        sx={{
          backgroundColor: "#00C194",
          color: "white",
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 2,
          transition: "0.4s !important",

          "&:hover": {
            backgroundColor: "#00A376",
          },
        }}
        onClick={scrollToTop}
      >
        <KeyboardDoubleArrowUpIcon />
      </IconButton>
    </Zoom>
  );
};

export default ScrollToTopButton;
