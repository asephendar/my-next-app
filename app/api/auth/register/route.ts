import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password sebelum menyimpannya ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        role, // Bisa "Lead" atau "Team"
      },
    });

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
