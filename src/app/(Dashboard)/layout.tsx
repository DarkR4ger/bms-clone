import { ReactNode } from "react";
import { DashBoardNavbar } from "@/components/Navbar/dashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashBoardNavbar />
      <main className="container px-6 min-h-screen">{children}</main>
    </>
  );
}
