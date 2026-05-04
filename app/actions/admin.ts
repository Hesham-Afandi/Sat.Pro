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

// Create a new course
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
      },
    });
    
    revalidatePath("/admin/courses");
    return { success: true, courseId: course.id };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Failed to create course" };
  }
}

// Update a course
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
      },
    });
    
    revalidatePath("/admin/courses");
    return { success: true, course };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, error: "Failed to update course" };
  }
}

// Delete a course
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

// Publish/Unpublish a course
export async function toggleCoursePublish(courseId: string, publish: boolean) {
  await checkAdmin();
  
  try {
    const course = await prisma.course.update({
      where: { id: courseId },
       { isPublished: publish },
    });
    
    revalidatePath("/admin/courses");
    return { success: true, course };
  } catch (error) {
    console.error("Error toggling course publish status:", error);
    return { success: false, error: "Failed to update course" };
  }
}

// Create a new exam
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
      },
    });
    
    revalidatePath("/admin/exams");
    return { success: true, examId: exam.id };
  } catch (error) {
    console.error("Error creating exam:", error);
    return { success: false, error: "Failed to create exam" };
  }
}

// Get all courses (admin view)
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

// Get course by ID
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
