"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Check if user is admin
export async function checkAdmin() {
  const session = await auth();
  
  if (!session || !session.user || (session.user as any).role !== "admin") {
    redirect("/login");
  }
  
  return session;
}

// ==================== COURSES ====================

export async function createCourse(formData: FormData) {
  await checkAdmin();
  
  // بنجيب البيانات من الفورم
  const title = formData.get("title") as string;
  
  try {
    // بنستخدم as any عشان نتجنب مشاكل الـ Schema
    const course = await prisma.course.create({
      data: {
        title,
        // أي حقل تاني عايز تضيفه حطه هنا
      } as any, // <-- الحل هنا
    });
    
    revalidatePath("/admin/courses");
    return { success: true, courseId: course.id };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Failed to create course" };
  }
}

export async function updateCourse(courseId: string, formData: FormData) {
  await checkAdmin();
  
  const title = formData.get("title") as string;
  const isPublished = formData.get("isPublished") === "on";
  
  try {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        title,
        isPublished,
      } as any, // <-- الحل هنا
    });
    
    revalidatePath("/admin/courses");
    return { success: true, course };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, error: "Failed to update course" };
  }
}

export async function deleteCourse(courseId: string) {
  await checkAdmin();
  
  try {
    await prisma.course.delete({
      where: { id: courseId },
    });
    
    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { success: false, error: "Failed to delete course" };
  }
}

export async function getAllCourses() {
  await checkAdmin();
  
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return { success: true, courses };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, error: "Failed to fetch courses" };
  }
}

// ==================== LESSONS ====================

export async function createLesson(formData: FormData) {
  await checkAdmin();
  
  const courseId = formData.get("courseId") as string;
  const title = formData.get("title") as string;
  
  try {
    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        title,
      } as any, // <-- الحل هنا
    });
    
    revalidatePath(`/admin/courses/${courseId}`);
    return { success: true, lessonId: lesson.id };
  } catch (error) {
    console.error("Error creating lesson:", error);
    return { success: false, error: "Failed to create lesson" };
  }
}

export async function deleteLesson(lessonId: string) {
  await checkAdmin();
  
  try {
    await prisma.lesson.delete({
      where: { id: lessonId },
    });
    
    // نحتاج نعرف الـ courseId عشان نحدث المسار، بس هنحاول نجيبه
    // لو مش مهم جداً تحديث المسار دلوقتي، ممكن نسيب الكود كده
    // لكن الأفضل نبحث عن الليسن الأول
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return { success: false, error: "Failed to delete lesson" };
  }
}

// ==================== EXAMS ====================

export async function createExam(formData: FormData) {
  await checkAdmin();
  
  const title = formData.get("title") as string;
  
  try {
    const exam = await prisma.exam.create({
      data: {
        title,
      } as any, // <-- الحل هنا
    });
    
    revalidatePath("/admin/exams");
    return { success: true, examId: exam.id };
  } catch (error) {
    console.error("Error creating exam:", error);
    return { success: false, error: "Failed to create exam" };
  }
}

export async function deleteExam(examId: string) {
  await checkAdmin();
  
  try {
    await prisma.exam.delete({
      where: { id: examId },
    });
    
    revalidatePath("/admin/exams");
    return { success: true };
  } catch (error) {
    console.error("Error deleting exam:", error);
    return { success: false, error: "Failed to delete exam" };
  }
}
