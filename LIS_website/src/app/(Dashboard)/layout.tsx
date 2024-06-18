"use client";

import DrawerSideBar from "@/components/drawerSideBar/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <DrawerSideBar />
      <div style={{ flexGrow: "1" }}>{children}</div>
    </div>
  );
}
