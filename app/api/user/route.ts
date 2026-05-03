import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // التحقق من وجود المستخدم
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل بالفعل" },
        { status: 400 }
      );
    }

    // إنشاء المستخدم
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "student",
      },
    });

    return NextResponse.json({
      id: user.id,
        name: user.name,
        email: user.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "حدث خطأ في إنشاء المستخدم" },
      { status: 500 }
    );
  }
}