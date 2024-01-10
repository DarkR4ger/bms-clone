import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="px-6 flex min-h-screen justify-center items-center">
        {children}
      </section>
    </>
  );
}
