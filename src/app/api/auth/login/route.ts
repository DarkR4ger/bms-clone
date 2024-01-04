import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import type { UserData } from "@/types";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [UserData, FormDataEntryValue]
  >;

  const body: UserData = Object.fromEntries(formData);

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

    return NextResponse.json({
      success: true,
      message: "User Logged In",
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
