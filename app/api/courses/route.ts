import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      include: {
        lessons: true,  // 👈 ده اللي كنا ناسينه!
        exams: true,    // 👈 وده كمان!
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching courses' }, { status: 500 });
  }
}