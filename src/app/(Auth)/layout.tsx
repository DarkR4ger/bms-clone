import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="px-6 flex min-h-screen justify-center items-center">
      {children}
    </main>
  );
}
