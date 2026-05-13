import { PrismaClient } from "@prisma/client";

// ✅ إنشاء Prisma Client بطريقة آمنة
function getPrismaClient() {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
}

export default async function CoursesPage() {
  const prisma = getPrismaClient();
  let courses = [];
  let errorInfo = "";

  try {
    console.log("🔍 Attempting to fetch courses...");
    
    // ✅ نجيب كل الكورسات
    courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    console.log("✅ Success! Found courses:", courses.length);
    console.log("Courses data:", JSON.stringify(courses, null, 2));
    
  } catch (error: any) {
    console.error("❌ Error fetching courses:", error);
    errorInfo = error.message || "Unknown error";
  } finally {
    await prisma.$disconnect();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الكورسات المتاحة</h1>
          <p className="text-lg text-gray-600">
            اختر الكورس المناسب وابدأ رحلة التحضير لاختبار الـ SAT
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              عدد الكورسات: <span className="font-bold text-indigo-600">{courses.length}</span>
            </p>
            {errorInfo && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-red-600 font-medium">⚠️ حدث خطأ:</p>
                <p className="text-red-500 text-sm mt-1">{errorInfo}</p>
              </div>
            )}
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border-2 border-dashed border-gray-200 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {errorInfo ? "حدث خطأ في جلب البيانات" : "لا توجد كورسات حالياً"}
            </h3>
            <p className="text-gray-500">
              {errorInfo 
                ? "راجع الـ logs في Vercel لمعرفة التفاصيل" 
                : "الداتابيز فاضية - أضف كورسات من Prisma Studio"}
            </p>
            {!errorInfo && (
              <div className="mt-6 text-sm text-gray-400">
                <p>💡 تلميح: افتح Prisma Studio وأضف كورس تجريبي</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div 
                key={course.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description || "بدون وصف"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    {course.level || "general"}
                  </span>
                  {course.subject && (
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {course.subject}
                    </span>
                  )}
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    course.isPublished 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {course.isPublished ? "✓ منشور" : "⏳ مسودة"}
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
