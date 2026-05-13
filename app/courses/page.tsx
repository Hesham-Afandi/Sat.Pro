import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  let courses: any[] = [];
  let errorMsg = "";

  try {
    console.log("🔍 Connecting to database...");
    
    // ✅ نجيب كل الكورسات من غير أي فلتر
    courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log("✅ Found courses:", courses.length);
    console.log("Courses:", JSON.stringify(courses, null, 2));
    
  } catch (error: any) {
    console.error("❌ Database error:", error);
    errorMsg = error.message || "خطأ في الاتصال بالداتابيز";
  } finally {
    await prisma.$disconnect();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          الكورسات المتاحة
        </h1>
        
        {errorMsg ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-bold mb-2">❌ حدث خطأ:</p>
            <p className="text-red-500 text-sm">{errorMsg}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              لا توجد كورسات حالياً
            </h3>
            <p className="text-gray-500 mb-4">
              عدد الكورسات في الداتابيز: <span className="font-bold">0</span>
            </p>
            <p className="text-sm text-gray-400">
              الداتابيز فاضية - تأكد من نقل البيانات
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
