import { HomePage } from "@/components/PageComponents/Home";
import { Navbar } from "@/components/Navbar/header";

export default async function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
