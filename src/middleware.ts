import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;
  if (req.nextUrl.pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
    return NextResponse.next();
  }
  if (req.nextUrl.pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return NextResponse.next();
  }
  if (req.nextUrl.pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return NextResponse.next();
  }
}
