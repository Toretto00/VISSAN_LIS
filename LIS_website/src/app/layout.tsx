"use client";

import "./globals.css";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fe0302", // Replace with your preferred color
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("role") === "user") router.push("requestForm");
    else if (sessionStorage.getItem("role") === "admin")
      router.push("/Dashboards");
    else router.push("/login");
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <ThemeProvider theme={theme}>
        <body>
          <div>{children}</div>
        </body>
      </ThemeProvider>
    </html>
  );
}
