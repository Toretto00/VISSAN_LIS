"use client";

import Header from "@/components/header/header";

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
