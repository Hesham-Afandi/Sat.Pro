import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ مهم جداً: await params في Next.js 16
  const { id } = await params;

  let exam: any = null;
  let errorInfo = "";

  try {
    console.log("🔍 Searching for exam with ID:", id);
    
    exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        course: true,
        questions: true,
      },
    });

    console.log("✅ Found exam:", exam?.title);
  } catch (error: any) {
    errorInfo = error.message;
    console.error("❌ Error:", error);
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">❌ خطأ</h1>
          <p className="text-gray-600 mb-4">
            الامتحان مش موجود أو فيه مشكلة في الداتابيز
          </p>
          {errorInfo && (
            <p className="text-sm text-gray-500 mb-4">التفاصيل: {errorInfo}</p>
          )}
          <p className="text-sm text-gray-400 mb-4">ID: {id}</p>
          <a href="/exam" className="text-indigo-600 hover:underline">
            ← العودة للامتحانات
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
        <p className="text-gray-600 mb-6">{exam.subject || 'عام'}</p>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">الأسئلة ({exam.questions.length})</h2>
          {exam.questions.map((q: any, i: number) => (
            <div key={q.id} className="border-b py-4">
              <p className="font-bold mb-2">{i + 1}. {q.text}</p>
              {q.explanation && <p className="text-sm text-gray-600">{q.explanation}</p>}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a href="/exam" className="text-indigo-600">← العودة</a>
        </div>
      </div>
    </div>
  );
}