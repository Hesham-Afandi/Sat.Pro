import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getExams() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        course: true,
        questions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log("✅ Found exams:", exams.length);
    return exams;
  } catch (error) {
    console.error("❌ Error fetching exams:", error);
    return [];
  }
}

export default async function ExamsPage() {
  const exams = await getExams();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          الامتحانات المتاحة
        </h1>

        {exams.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              لا توجد امتحانات حالياً
            </h3>
            <p className="text-gray-500">
              عدد الامتحانات: <span className="font-bold">0</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <Link
                key={exam.id}
                href={`/exam/${exam.id}`}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {exam.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {exam.subject || 'عام'}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>⏱️ {exam.duration || '60'} دقيقة</span>
                  <span>❓ {exam.questions.length} سؤال</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}