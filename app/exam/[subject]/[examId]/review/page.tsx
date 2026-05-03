"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSession } from "next-auth/react";
import { examsData } from "@/data/courses"; // ✅ استيراد البيانات الحقيقية

export default function ExamReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { t, dir } = useLanguage();
  const {  session } = useSession();
  
  const [examData, setExamData] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  const examId = params.examId as string;
  const subject = params.subject as string;

  useEffect(() => {
    // 1. جلب بيانات الامتحان الحقيقية بناءً على الـ ID
    const exam = examsData[examId];
    
    if (!exam) {
      router.push("/courses");
      return;
    }

    setExamData(exam);
    setTotalQuestions(exam.questions.length);

    // 2. جلب إجابات الطالب من localStorage
    const savedData = localStorage.getItem(`exam_${examId}_result`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserAnswers(parsed.answers || {});
      setScore(parsed.score || 0);
    }

    setLoading(false);
  }, [examId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-gray-500 animate-pulse">Loading Review...</div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exam Not Found</h1>
          <Link href="/courses" className="text-blue-600 hover:underline">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getOptionClass = (question: any, optionIndex: number) => {
    const optionLabel = String.fromCharCode(65 + optionIndex); // A, B, C, D
    const isCorrect = optionLabel === question.correct;
    const isUserAnswer = userAnswers[question.id] === optionLabel;
    
    if (isCorrect) return "border-green-500 bg-green-50";
    if (isUserAnswer && !isCorrect) return "border-red-500 bg-red-50";
    return "border-gray-200";
  };

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/"><Logo className="w-16 h-16" /></Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* النتيجة الإجمالية */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{examData.title} - Review</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-5xl font-bold mb-2">{percentage}%</div>
              <div className="text-lg opacity-90">Total Score</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-5xl font-bold mb-2">{score}/{totalQuestions}</div>
              <div className="text-lg opacity-90">Correct Answers</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-5xl font-bold mb-2">{totalQuestions - score}</div>
              <div className="text-lg opacity-90">Wrong Answers</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/courses/${subject}`}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
            >
              Back to Course
            </Link>
            <Link
              href={`/exam/${subject}/${examId}`}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              Retake Exam
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* مراجعة الأسئلة */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Review</h2>
          
          {examData.questions.map((question: any, index: number) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correct;
            
            return (
              <div key={question.id} className={`bg-white rounded-2xl shadow-xl p-8 border-l-8 ${isCorrect ? "border-green-500" : "border-red-500"}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 ${isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-gray-900">Question {index + 1}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{question.text}</h3>
                  </div>
                </div>

                {/* الخيارات */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {question.options.map((option: string, optIndex: number) => {
                    const optionLabel = String.fromCharCode(65 + optIndex);
                    const isCorrectOption = optionLabel === question.correct;
                    const isUserOption = userAnswer === optionLabel;
                    
                    return (
                      <div
                        key={optionLabel}
                        className={`p-4 rounded-xl border-2 transition-all ${getOptionClass(question, optIndex)}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">{optionLabel}.</span>
                          <span className="flex-1">{option}</span>
                          {isCorrectOption && <span className="text-green-600 text-2xl">✓</span>}
                          {isUserOption && !isCorrect && <span className="text-red-600 text-2xl">✗</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* الشرح */}
                {question.explanation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-2">Explanation:</h4>
                        <p className="text-blue-800">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ملخص الإجابة */}
                <div className="mt-4 flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Your answer:</span>
                    <span className={`font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                      {userAnswer || "Not answered"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Correct answer:</span>
                    <span className="font-bold text-green-600">{question.correct}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* توصيات */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Performance Analysis</h3>
          <div className="space-y-3">
            {percentage >= 80 && (
              <>
                <p className="text-gray-700">🎉 <strong>Excellent work!</strong> You have a strong understanding of the material.</p>
                <p className="text-gray-700">💡 <strong>Recommendation:</strong> Move on to the next topic or take more advanced exams.</p>
              </>
            )}
            {percentage >= 60 && percentage < 80 && (
              <>
                <p className="text-gray-700">👍 <strong>Good job!</strong> You understand most concepts but need some review.</p>
                <p className="text-gray-700">💡 <strong>Recommendation:</strong> Review the questions you got wrong and retake the exam.</p>
              </>
            )}
            {percentage < 60 && (
              <>
                <p className="text-gray-700">📚 <strong>Keep practicing!</strong> You need more study in this topic.</p>
                <p className="text-gray-700">💡 <strong>Recommendation:</strong> Watch the video lessons and review the course material before retaking.</p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}