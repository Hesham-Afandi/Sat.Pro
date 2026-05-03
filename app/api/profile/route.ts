import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        grade: data.grade,
        school: data.school,
        bio: data.bio,
        image: data.profileImage,
        coverImage: data.coverImage,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        email: true,
        phone: true,
        address: true,
        grade: true,
        school: true,
        bio: true,
        image: true,
        coverImage: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}