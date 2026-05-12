import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPublishedCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return courses;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const courses = await getPublishedCourses();

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            احصل على درجة <span className="text-yellow-300">SAT</span> أحلامك
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8">
            منصة تعليمية متكاملة مع كورسات احترافية، امتحانات تجريبية، ومتابعة ذكية لأدائك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              ابدأ الآن مجاناً
            </Link>
            <Link 
              href="/exam" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition"
            >
              جرب امتحان تجريبي
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">كورسات شاملة</h3>
              <p className="text-gray-600">محتوى تعليمي مُحدَّث يغطي كل أجزاء اختبار الـ SAT</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">امتحانات تجريبية</h3>
              <p className="text-gray-600">تدرب على أسئلة حقيقية مع تحليل فوري لأدائك</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">متابعة ذكية</h3>
              <p className="text-gray-600">لوحة تحكم تتابع تقدمك وتقترح عليك نقاط التحسين</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">أحدث الكورسات</h2>
            <Link href="/courses" className="text-indigo-600 font-medium hover:underline">
              عرض الكل ←
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg">🎉 الكورسات قريباً! تابعنا</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold opacity-30">
                      {course.subject?.charAt(0) || "S"}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                      {course.level === "beginner" ? "مبتدئ" : course.level === "intermediate" ? "متوسط" : "متقدم"}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {course.description || "وصف الكورس سيظهر هنا..."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">مستعد تبدأ رحلة النجاح؟</h2>
          <p className="text-indigo-100 text-lg mb-8">
            انضم لآلاف الطلاب الذين حققوا درجات عالية في الـ SAT
          </p>
          <Link 
            href="/register" 
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            أنشئ حسابك مجاناً
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© 2026 SAT PRO. جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}
