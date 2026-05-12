import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

type Course = {
  id: string;
  title: string;
  subject: string | null;
  isPublished: boolean;
};

async function getUserCourses(): Promise<Course[]> {
  try {
    // ✅ نجيب الكورسات المنشورة فقط (بدون فلتر على المستخدم عشان الـ Auth معطل)
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      take: 5, // نجيب 5 كورسات فقط للعرض
      orderBy: { createdAt: "desc" },
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const courses = await getUserCourses();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* الترحيب */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            👋 أهلاً بك في لوحة التحكم
          </h1>
          <p className="text-gray-600 mt-2">
            تابع تقدمك في الكورسات والامتحانات
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">كورسات مكتملة</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">امتحانات مجتازة</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">ساعات دراسة</div>
          </div>
        </div>

        {/* الكورسات الجارية */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">الكورسات الجارية</h2>
            <Link href="/courses" className="text-indigo-600 text-sm font-medium hover:underline">
              عرض الكل ←
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500 mb-4">📚 لم تبدأ أي كورسات بعد</p>
              <Link 
                href="/courses" 
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                تصفح الكورسات
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.subject || "عام"}</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      مستمر
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* روابط سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/courses" className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-700">الكورسات</div>
          </Link>
          <Link href="/exam" className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm font-medium text-gray-700">الامتحانات</div>
          </Link>
          <Link href="/profile" className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium text-gray-700">حسابي</div>
          </Link>
          <Link href="/pricing" className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="text-2xl mb-2">💎</div>
            <div className="text-sm font-medium text-gray-700">الاشتراكات</div>
          </Link>
        </div>

      </div>
    </div>
  );
}
