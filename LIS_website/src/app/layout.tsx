"use client";

import "./globals.css";

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
