import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // نجيب الامتحان
    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!exam) {
      return (
        <div className="min-h-screen flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">الامتحان مش موجود</h1>
            <a href="/exam" className="text-indigo-600">← العودة</a>
          </div>
        </div>
      );
    }

    // نجيب الأسئلة بطريقة تانية
    const questions = await prisma.question.findMany({
      where: { 
        OR: [
          { examId: id },
          // لو مفيش أسئلة، نجيب أي أسئلة عشان نعرض حاجة
        ]
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`📊 Found ${questions.length} questions for exam ${id}`);

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
          <p className="text-gray-600 mb-6">{exam.subject || 'عام'}</p>
          
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex gap-6 text-sm">
              <span>⏱️ {exam.duration || '60'} دقيقة</span>
              <span>❓ {questions.length} سؤال</span>
            </div>
          </div>

          {questions.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-yellow-700 mb-2">⚠️ مفيش أسئلة في الامتحان ده لسه</p>
              <p className="text-sm text-yellow-600">
                الأسئلة هتتضاف قريباً
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">الأسئلة ({questions.length})</h2>
              {questions.map((q, i) => (
                <div key={q.id} className="border-b py-4 last:border-0">
                  <p className="font-bold mb-2">{i + 1}. {q.text}</p>
                  {q.options && (
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {JSON.parse(q.options).map((opt: string, j: number) => (
                        <div key={j} className="p-2 bg-gray-50 rounded">
                          {String.fromCharCode(65 + j)}. {opt}
                        </div>
                      ))}
                    </div>
                  )}
                  {q.explanation && (
                    <p className="text-sm text-blue-600 mt-2">💡 {q.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/exam" className="text-indigo-600">← العودة</a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">حدث خطأ</h1>
          <a href="/exam" className="text-indigo-600">← العودة</a>
        </div>
      </div>
    );
  }
}