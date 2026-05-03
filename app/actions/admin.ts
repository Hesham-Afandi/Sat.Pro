"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// 🔒 دالة لفحص صلاحية الأدمن
async function checkAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/login");
  }
}

// 📚 إضافة كورس جديد
export async function createCourse(formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;

  await prisma.course.create({
    data: {  // ✅ التصحيح: إضافة كلمة data
      title,
      subject,
      description,
      isPublished: true,
    },
  });

  revalidatePath("/admin/courses");
}

// 🗑️ حذف كورس
export async function deleteCourse(id: string) {
  await checkAdmin();

  await prisma.course.delete({
    where: { id },
  });

  revalidatePath("/admin/courses");
}

// 📝 إضافة امتحان جديد
export async function createExam(formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const duration = parseInt(formData.get("duration") as string);
  const totalMarks = parseInt(formData.get("totalMarks") as string);

  await prisma.exam.create({
    data: {  // ✅ التصحيح: إضافة كلمة data
      title,
      subject,
      duration,
      totalMarks,
      isPublished: true,
    },
  });

  revalidatePath("/admin/exams");
}

// 🗑️ حذف امتحان
export async function deleteExam(id: string) {
  await checkAdmin();

  await prisma.exam.delete({
    where: { id },
  });

  revalidatePath("/admin/exams");
}
//  إضافة درس جديد
export async function createLesson(formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const courseId = formData.get("courseId") as string;
  const description = formData.get("description") as string;

  await prisma.lesson.create({
  data: {
    title,
    videoUrl,
    description,
    courseId,
  },
});

  revalidatePath(`/admin/courses/${courseId}`);
}

// 🗑️ حذف درس
export async function deleteLesson(id: string, courseId: string) {
  await checkAdmin();

  await prisma.lesson.delete({
    where: { id },
  });

  revalidatePath(`/admin/courses/${courseId}`);
}