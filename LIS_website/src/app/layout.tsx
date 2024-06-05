"use client";

import "./globals.css";
//import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header/header";
import Footer from "@/components/footer";

import { GlobalContextProvider } from "./Context/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>
          <Header />
          <div style={{ minHeight: "100vh" }}>{children}</div>
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
