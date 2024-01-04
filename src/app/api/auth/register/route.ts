import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import type { UserData } from "@/types";

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [UserData, FormDataEntryValue]
  >;
  const body: UserData = Object.fromEntries(formData);
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists, please login",
        },
        { status: 401 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    body.password = hash;

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created, please login",
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Someting went wrong, please try again",
    });
  }
}
