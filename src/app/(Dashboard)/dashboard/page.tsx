import { redirect } from "next/navigation";
import Authentication from "@/lib/Auth";
import { DashboardPage } from "@/components/PageComponents/DashBoard/Dashboard";
import { Suspense } from "react";

export default async function DashBoard() {
  const response = await Authentication().then((data) => data);
  if (!response.success) {
    redirect("/login");
  }

  const { id, name, email, isAdmin } = response.data;
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardPage id={id} name={name} email={email} isAdmin={isAdmin} />
      </Suspense>
    </>
  );
}
