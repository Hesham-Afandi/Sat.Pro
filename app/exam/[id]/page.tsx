'use client';

import { useState, useEffect, useCallback } from 'react';
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

// ده هيكون Client Component عشان التايمر والتفاعل

interface Question {
  id: string;
  text: string;
  options: string | null;
  correct: string;
  explanation: string | null;
}

interface ExamData {
  id: string;
  title: string;
  subject: string | null;
  duration: string | null;
  questions: Question[];
}

export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 دقيقة بالثواني
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // جلب البيانات
  useEffect(() => {
    async function fetchExam() {
      try {
        const { id } = await params;
        const res = await fetch(`/api/exam/${id}`);
        if (!res.ok) {
          notFound();
          return;
        }
        const data = await res.json();
        setExam(data);
        setTimeLeft(parseInt(data.duration || '60') * 60);
        setIsActive(true);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setLoading(false);
      }
    }
    fetchExam();
  }, [params]);

  // التايمر
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResults]);

  // اختيار إجابة
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // الانتقال للسؤال التالي/السابق
  const navigateQuestion = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentQuestion < (exam?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // تسليم الامتحان
  const handleSubmit = useCallback(() => {
    if (!exam) return;

    let correctCount = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowResults(true);
    setIsActive(false);
  }, [exam, answers]);

  // تنسيق الوقت
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">جاري التحميل...</div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-600">الامتحان مش موجود</div>
      </div>
    );
  }

  // صفحة النتائج
  if (showResults) {
    const percentage = Math.round((score / exam.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          {/* النتيجة */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">نتيجة الامتحان</h1>
            <div className="text-6xl font-bold mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
            </div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {score} من {exam.questions.length}
            </div>
            <div className="text-2xl text-gray-600 mb-6">
              {percentage}%
            </div>
            <div className={`text-xl font-bold ${
              percentage >= 70 ? 'text-green-600' : 
              percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage >= 70 ? 'ممتاز! 🌟' : 
               percentage >= 50 ? 'جيد، استمر في التعلم 💪' : 
               'تحتاج للمزيد من المذاكرة 📖'}
            </div>
          </div>

          {/* مراجعة الإجابات */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-6">مراجعة الإجابات</h2>
            {exam.questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;
              const options = q.options ? JSON.parse(q.options) : [];

              return (
                <div key={q.id} className={`border-2 rounded-lg p-6 mb-6 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`text-2xl font-bold ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        السؤال {index + 1}: {q.text}
                      </h3>
                      
                      {/* الخيارات */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {options.map((opt: string, i: number) => {
                          const optionChar = String.fromCharCode(65 + i);
                          const isUserChoice = userAnswer === opt;
                          const isCorrectChoice = q.correct === opt;
                          
                          let bgClass = 'bg-gray-100';
                          if (isCorrectChoice) bgClass = 'bg-green-500 text-white';
                          else if (isUserChoice && !isCorrect) bgClass = 'bg-red-500 text-white';
                          
                          return (
                            <div key={i} className={`p-3 rounded-lg ${bgClass}`}>
                              {optionChar}. {opt}
                              {isCorrectChoice && ' ✓'}
                              {isUserChoice && !isCorrect && ' ✗'}
                            </div>
                          );
                        })}
                      </div>

                      {/* الشرح */}
                      {q.explanation && (
                        <div className="bg-blue-50 border-r-4 border-blue-500 p-3 rounded">
                          <p className="text-sm text-blue-800">
                            <strong>💡 الشرح:</strong> {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* زر العودة */}
          <div className="mt-8 text-center">
            <a
              href="/exam"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              ← العودة للامتحانات
            </a>
          </div>
        </div>
      </div>
    );
  }

  // صفحة الامتحان
  const question = exam.questions[currentQuestion];
  const options = question?.options ? JSON.parse(question.options) : [];
  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* الهيدر */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{exam.title}</h1>
            <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${
              timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-indigo-100 text-indigo-600'
            }`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>

          {/* شريط التقدم */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            السؤال {currentQuestion + 1} من {exam.questions.length}
          </div>
        </div>

        {/* السؤال */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-lg">
            {question.text}
          </h2>

          {/* الخيارات */}
          <div className="space-y-3">
            {options.map((opt: string, i: number) => {
              const optionChar = String.fromCharCode(65 + i);
              const isSelected = answers[question.id] === opt;
              
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(question.id, opt)}
                  className={`w-full p-4 rounded-lg border-2 text-right transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-bold ml-2">{optionChar}.</span>
                  {opt}
                  {isSelected && <span className="mr-2">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigateQuestion('prev')}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← السابق
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold"
          >
            تسليم الامتحان ✓
          </button>

          <button
            onClick={() => navigateQuestion('next')}
            disabled={currentQuestion === exam.questions.length - 1}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي →
          </button>
        </div>

        {/* قائمة الأسئلة */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold mb-4">جميع الأسئلة</h3>
          <div className="flex flex-wrap gap-2">
            {exam.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-lg font-bold transition ${
                  idx === currentQuestion
                    ? 'bg-indigo-600 text-white'
                    : answers[exam.questions[idx].id]
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}