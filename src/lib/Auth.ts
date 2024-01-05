import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./db";

interface AuthenticationRespone {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

interface DecodedData {
  userId: string;
  email: string;
}

const { SECRET_KEY } = process.env;

export default async function Authentication(): Promise<AuthenticationRespone> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return {
      success: false,
      data: { id: "", name: "", email: "" },
    };
  }

  const decoded = jwt.verify(token, SECRET_KEY) as DecodedData;

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  });

  if (!user) {
    return {
      success: false,
      data: { id: "", name: "", email: "" },
    };
  }

  return {
    success: true,
    data: user,
  };
}
