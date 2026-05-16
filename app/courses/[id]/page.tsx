import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: true,
      exams: true,
    },
  });

  if (!course) {
    notFound();
  }

  const sortedLessons = course.lessons.sort((a, b) => a.order - b.order);
  const firstExam = course.exams[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* زر الرجوع */}
        <Link href="/courses" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition">
          ← العودة لقائمة الكورسات
        </Link>

        {/* الهيدر */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-t-4 border-indigo-600">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 text-lg">{course.description}</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                📚 {sortedLessons.length} درس
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm">
                 {course.exams.length} امتحان
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm">
                {course.subject}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b">تفاصيل الكورس</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-500">المادة:</span>
                  <span className="font-semibold">{course.subject}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">المسار:</span>
                  <span className="font-semibold">{course.category || 'عام'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">المستوى:</span>
                  <span className="font-semibold capitalize">{course.level}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">الدروس:</span>
                  <span className="font-semibold text-indigo-600">{sortedLessons.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">الامتحانات:</span>
                  <span className="font-semibold text-green-600">{course.exams.length}</span>
                </li>
              </ul>
              
              {firstExam && (
                <Link 
                  href={`/exam/${firstExam.id}`} 
                  className="mt-6 block w-full text-center py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  ابدأ الامتحان الأول
                </Link>
              )}
            </div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* الدروس */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📚 محتوى الكورس ({sortedLessons.length} درس)
              </h2>
              
              <div className="space-y-3">
                {sortedLessons.map((lesson, index) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-1">{lesson.title}</h3>
                          <p className="text-gray-500 text-sm">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-lg whitespace-nowrap">
                        ⏱️ {lesson.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الامتحانات */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 الامتحانات ({course.exams.length})
              </h2>
              
              {course.exams.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">لا توجد امتحانات متاحة حالياً</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.exams.map((exam, index) => (
                    <Link
                      key={exam.id}
                      href={`/exam/${exam.id}`}
                      className="block p-5 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800 group-hover:text-green-700">
                          {exam.title}
                        </h3>
                        <span className="text-2xl">📝</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="bg-white px-3 py-1 rounded border border-gray-200">
                          {exam.totalQuestions} سؤال
                        </span>
                        <span className="bg-white px-3 py-1 rounded border border-gray-200">
                          {exam.duration} دقيقة
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}