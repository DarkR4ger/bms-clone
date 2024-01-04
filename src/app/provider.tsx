"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function NextProviders({ children }: { children: ReactNode }) {
  const router = useRouter();
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
