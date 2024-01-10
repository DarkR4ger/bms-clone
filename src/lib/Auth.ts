import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./db";

interface AuthenticationRespone {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
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
      data: { id: "", name: "", email: "", isAdmin: false },
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
      isAdmin: true,
    },
  });

  if (!user) {
    return {
      success: false,
      data: { id: "", name: "", email: "", isAdmin: false },
    };
  }

  return {
    success: true,
    data: user,
  };
}
