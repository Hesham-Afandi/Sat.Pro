import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  let courses: any[] = [];
  let errorMessage = "";

  try {
    // ✅ نجيب كل الكورسات
    courses = await prisma.course.findMany();
    
    // ✅ نطبع في الـ console عشان نعرف
    console.log("✅ Courses found:", courses.length);
    if (courses.length > 0) {
      console.log("First course:", JSON.stringify(courses[0], null, 2));
    }
  } catch (error: any) {
    errorMessage = error.message || "حدث خطأ غير متوقع";
    console.error("❌ Error fetching courses:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الكورسات المتاحة</h1>
          <p className="text-lg text-gray-600">
            اختر الكورس المناسب وابدأ رحلة التحضير لاختبار الـ SAT
          </p>
          <p className="text-sm text-gray-500 mt-2">
            عدد الكورسات: {courses.length}
          </p>
          {errorMessage && (
            <p className="text-red-500 mt-2">
              خطأ: {errorMessage}
            </p>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500 text-lg mb-2">🎉 لا توجد كورسات حالياً</p>
            <p className="text-sm text-gray-400">
              {errorMessage ? "حدث خطأ في جلب البيانات" : "الداتابيز فاضية"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description || "بدون وصف"}</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                    {course.level || "general"}
                  </span>
                  <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {course.isPublished ? "منشور" : "مسودة"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
