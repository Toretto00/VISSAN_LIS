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
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <section>{children}</section>
        {/* <GlobalContextProvider>
        </GlobalContextProvider> */}
      </body>
    </html>
  );
}
