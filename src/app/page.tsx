import { redirect } from "next/navigation";
import Authentication from "@/lib/Auth";
import HomePage from "@/components/home";
import { Suspense } from "react";

export default async function Home() {
  const response = await Authentication().then((data) => data);
  if (!response.success) {
    redirect("/login");
  }

  const { id, name, email } = response.data;

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <HomePage id={id} name={name} email={email} />
    </Suspense>
  );
}
