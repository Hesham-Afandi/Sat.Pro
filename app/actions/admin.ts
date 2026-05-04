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
  
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  
  try {
    const course = await prisma.course.create({
       {
        title,
        subject,
        description: description || null,
        category: category || null,
        level: level || "beginner",
        isPublished: false,
      } as any, // ✅ تجاهل type check
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
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  const isPublished = formData.get("isPublished") === "on";
  
  try {
    const course = await prisma.course.update({
      where: { id: courseId },
       {
        title,
        subject,
        description: description || null,
        category: category || null,
        level: level || "beginner",
        isPublished,
      } as any, // ✅ تجاهل type check
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

export async function toggleCoursePublish(courseId: string, publish: boolean) {
  await checkAdmin();
  
  try {
    const course = await prisma.course.update({
      where: { id: courseId },
       { isPublished: publish } as any, // ✅ تجاهل type check
    });
    
    revalidatePath("/admin/courses");
    return { success: true, course };
  } catch (error) {
    console.error("Error toggling course publish status:", error);
    return { success: false, error: "Failed to update course" };
  }
}

export async function getAllCourses() {
  await checkAdmin();
  
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { lessons: true, exams: true },
        },
      },
    });
    
    return { success: true, courses };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, error: "Failed to fetch courses" };
  }
}

export async function getCourseById(courseId: string) {
  await checkAdmin();
  
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: true,
        exams: true,
      },
    });
    
    return { success: true, course };
  } catch (error) {
    console.error("Error fetching course:", error);
    return { success: false, error: "Failed to fetch course" };
  }
}

// ==================== LESSONS ====================

export async function createLesson(formData: FormData) {
  await checkAdmin();
  
  const courseId = formData.get("courseId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const order = parseInt(formData.get("order") as string) || 0;
  
  try {
    const lesson = await prisma.lesson.create({
       {
        courseId,
        title,
        description: description || null,
        videoUrl: videoUrl || null,
        order,
      } as any, // ✅ تجاهل type check
    });
    
    revalidatePath(`/admin/courses/${courseId}`);
    return { success: true, lessonId: lesson.id };
  } catch (error) {
    console.error("Error creating lesson:", error);
    return { success: false, error: "Failed to create lesson" };
  }
}

export async function updateLesson(lessonId: string, formData: FormData) {
  await checkAdmin();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const order = parseInt(formData.get("order") as string) || 0;
  
  try {
    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
       {
        title,
        description: description || null,
        videoUrl: videoUrl || null,
        order,
      } as any, // ✅ تجاهل type check
    });
    
    revalidatePath(`/admin/courses/${lesson.courseId}`);
    return { success: true, lesson };
  } catch (error) {
    console.error("Error updating lesson:", error);
    return { success: false, error: "Failed to update lesson" };
  }
}

export async function deleteLesson(lessonId: string) {
  await checkAdmin();
  
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { courseId: true },
    });
    
    await prisma.lesson.delete({
      where: { id: lessonId },
    });
    
    if (lesson) {
      revalidatePath(`/admin/courses/${lesson.courseId}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return { success: false, error: "Failed to delete lesson" };
  }
}

export async function getLessonsByCourse(courseId: string) {
  await checkAdmin();
  
  try {
    const lessons = await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: "asc" },
    });
    
    return { success: true, lessons };
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return { success: false, error: "Failed to fetch lessons" };
  }
}

// ==================== EXAMS ====================

export async function createExam(formData: FormData) {
  await checkAdmin();
  
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const duration = parseInt(formData.get("duration") as string);
  const totalQuestions = parseInt(formData.get("totalQuestions") as string);
  
  try {
    const exam = await prisma.exam.create({
       {
        title,
        subject,
        duration,
        totalQuestions,
      } as any, // ✅ تجاهل type check
    });
    
    revalidatePath("/admin/exams");
    return { success: true, examId: exam.id };
  } catch (error) {
    console.error("Error creating exam:", error);
    return { success: false, error: "Failed to create exam" };
  }
}

export async function updateExam(examId: string, formData: FormData) {
  await checkAdmin();
  
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const duration = parseInt(formData.get("duration") as string);
  const totalQuestions = parseInt(formData.get("totalQuestions") as string);
  
  try {
    const exam = await prisma.exam.update({
      where: { id: examId },
       {
        title,
        subject,
        duration,
        totalQuestions,
      } as any, // ✅ تجاهل type check
    });
    
    revalidatePath("/admin/exams");
    return { success: true, exam };
  } catch (error) {
    console.error("Error updating exam:", error);
    return { success: false, error: "Failed to update exam" };
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

export async function getAllExams() {
  await checkAdmin();
  
  try {
    const exams = await prisma.exam.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return { success: true, exams };
  } catch (error) {
    console.error("Error fetching exams:", error);
    return { success: false, error: "Failed to fetch exams" };
  }
}

// ==================== USERS ====================

export async function getAllUsers() {
  await checkAdmin();
  
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { courses: true, exams: true },
        },
      },
    });
    
    return { success: true, users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function updateUserRole(userId: string, role: string) {
  await checkAdmin();
  
  try {
    const user = await prisma.user.update({
      where: { id: userId },
       { role } as any, // ✅ تجاهل type check
    });
    
    revalidatePath("/admin/users");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

export async function deleteUser(userId: string) {
  await checkAdmin();
  
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
