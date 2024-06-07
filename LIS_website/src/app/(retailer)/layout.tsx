"use client";

// import "../globals.css";
//import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header/header";
import Footer from "@/components/footer";

// import { GlobalContextProvider } from "../Context/store";

// const inter = Inter({ subsets: ["latin"] });

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </div>
  );
}
