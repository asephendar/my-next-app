import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  // Cari pengguna berdasarkan email
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Verifikasi password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Buat JWT token
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return NextResponse.json({ token }, { status: 200 });
};
