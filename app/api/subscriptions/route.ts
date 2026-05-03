import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: userId },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { planId, price } = await request.json();

    if (!planId) {
      return NextResponse.json({ error: "الخطة مطلوبة" }, { status: 400 });
    }

    // جلب جميع الكورسات
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
    });

    // إنشاء اشتراكات لكل الكورسات
    const subscriptions = [];
    
    for (const course of courses) {
      const subscription = await prisma.subscription.create({
        data: {
          userId: userId,
          courseId: course.id,
          isActive: true,
          endDate: price === 0 ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      subscriptions.push(subscription);
    }

    return NextResponse.json({ 
      success: true, 
      message: "تم الاشتراك بنجاح",
      subscriptions 
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}