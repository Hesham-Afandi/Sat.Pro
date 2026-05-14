import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

async function getExam(id: string) {
  const exam = await prisma.exam.findUnique({
    where: { id },
    include: {
      course: true,
      questions: true,
    },
  });

  if (!exam) {
    return null;
  }

  return exam;
}

export default async function ExamDetailPage({ params }: { params: { id: string } }) {
  const exam = await getExam(params.id);

  if (!exam) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{exam.title}</h1>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>📚 {exam.course?.title || 'عام'}</span>
            <span>📝 {exam.subject || 'بدون تخصص'}</span>
            <span>⏱️ {exam.duration || '60'} دقيقة</span>
            <span>❓ {exam.totalQuestions || exam.questions.length} سؤال</span>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الأسئلة</h2>
          
          {exam.questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              لا توجد أسئلة في هذا الامتحان بعد
            </p>
          ) : (
            <div className="space-y-6">
              {exam.questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    السؤال {index + 1}: {question.text}
                  </h3>
                  
                  {question.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {JSON.parse(question.options).map((option: string, i: number) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border ${
                            option === question.correct
                              ? 'bg-green-50 border-green-200 text-green-700'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                      <p className="text-blue-700 text-sm">
                        <strong>الشرح:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/exam"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            ← العودة للامتحانات
          </a>
        </div>
      </div>
    </div>
  );
}