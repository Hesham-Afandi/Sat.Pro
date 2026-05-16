import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // استخراج الـ ID من الرابط
  const { id } = await params;

  // جلب بيانات الكورس مع الدروس والامتحانات المرتبطة به
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: true,
      exams: true,
    },
  });

  // لو الكورس مش موجود، اعرض صفحة 404
  if (!course) {
    notFound();
  }

  // ترتيب الدروس حسب الرقم (Order)
  const sortedLessons = course.lessons.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* زر الرجوع */}
        <Link href="/courses" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition">
          ← العودة لقائمة الكورسات
        </Link>

        {/* 🟦 رأس الصفحة (معلومات الكورس) */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-t-4 border-indigo-600">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 text-lg max-w-2xl">{course.description}</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm">
                {course.subject}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                {sortedLessons.length} درس
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm">
                {course.exams.length} امتحان
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 🟨 العمود الأيمن: المحتوى (الدروس والامتحانات) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* قسم الدروس */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📚 محتوى الكورس
              </h2>
              
              <div className="space-y-4">
                {sortedLessons.map((lesson) => (
                  <div key={lesson.id} className="group border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm">
                            {lesson.order}
                          </span>
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {lesson.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm mr-11">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-lg whitespace-nowrap">
                        <span>⏱️</span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* قسم الامتحانات */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 اختبارات الكورس
              </h2>
              
              {course.exams.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">لا توجد امتحانات متاحة حالياً</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.exams.map((exam) => (
                    <Link
                      key={exam.id}
                      href={`/exam/${exam.id}`}
                      className="block p-5 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800 group-hover:text-green-700">{exam.title}</h3>
                        <span className="text-2xl">📝</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="bg-white px-2 py-1 rounded border border-gray-200">
                          {exam.totalQuestions} سؤال
                        </span>
                        <span className="bg-white px-2 py-1 rounded border border-gray-200">
                          {exam.duration} دقيقة
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 🟩 العمود الأيسر: تفاصيل إضافية (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b">تفاصيل الكورس</h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">المادة:</span>
                  <span className="font-semibold text-gray-800">{course.subject}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">المسار:</span>
                  <span className="font-semibold text-gray-800">{course.category || 'عام'}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">المستوى:</span>
                  <span className="font-semibold text-gray-800 capitalize">{course.level}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">عدد الدروس:</span>
                  <span className="font-semibold text-indigo-600">{sortedLessons.length}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">عدد الامتحانات:</span>
                  <span className="font-semibold text-green-600">{course.exams.length}</span>
                </li>
              </ul>
              
              {/* زر ابدأ الامتحان (يظهر فقط لو فيه امتحانات) */}
              {course.exams.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <Link 
                    href={`/exam/${course.exams[0].id}`} 
                    className="block w-full text-center py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                  >
                    ابدأ الامتحان الأول
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}