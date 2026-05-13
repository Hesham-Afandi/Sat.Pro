import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getCourses() {
  try {
    // ✅ نجيب كل الكورسات من غير فلتر عشان نتأكد
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    console.log("📚 Number of courses:", courses.length);
    console.log("First course:", courses[0]);
    
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الكورسات المتاحة</h1>
          <p className="text-lg text-gray-600">
            اختر الكورس المناسب وابدأ رحلة التحضير لاختبار الـ SAT
          </p>
          <p className="text-sm text-gray-500 mt-2">
            عدد الكورسات: {courses.length}
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg mb-4">🎉 لا توجد كورسات حالياً</p>
            <p className="text-sm text-gray-400">عدد الكورسات في الداتابيز: {courses.length}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <Link 
                href={`/courses/${course.id}`} 
                key={course.id}
                className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                      {course.level === "beginner" ? "مبتدئ" : 
                       course.level === "intermediate" ? "متوسط" : "متقدم"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.subject || "عام"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description || "وصف الكورس سيظهر هنا..."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-indigo-600">
                      ابدأ الآن ←
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      course.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {course.isPublished ? 'منشور' : 'مسودة'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
