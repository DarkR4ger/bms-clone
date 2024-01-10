import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import type { LoginData } from "@/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const { SECRET_KEY } = process.env;

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [LoginData, FormDataEntryValue]
  >;

  const body: LoginData = Object.fromEntries(formData);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't exists, Please register",
        },
        { status: 401 },
      );
    }

    const results = await bcrypt.compare(body.password, user.password);
    if (!results) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 },
      );
    }
    const token = jwt.sign(
      { userId: user.id, emailId: user.email },
      SECRET_KEY,
      { expiresIn: "1d" },
    );

    cookies().set("token", token);

    return NextResponse.json({
      success: true,
      message: "User Logged In",
      token: token,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
