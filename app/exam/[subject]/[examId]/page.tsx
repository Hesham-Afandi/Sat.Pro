"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { examsData } from "@/data/courses";

export default function ExamPage() {
  const params = useParams();
  const { t, dir } = useLanguage();

  const examId = params.examId as string;
  const subject = params.subject as string;

  const exam = examsData[examId];
  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exam Not Found</h1>
          <Link href="/courses" className="text-blue-600 hover:underline">Go back</Link>
        </div>
      </div>
    );
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    exam.questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    setScore(correctCount);
    localStorage.setItem(`exam_${examId}_result`, JSON.stringify({ answers, score: correctCount, total: exam.questions.length }));
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQ = exam.questions[currentQuestion];
  const options = ["A", "B", "C", "D"];
  const progress = Math.round((Object.keys(answers).length / exam.questions.length) * 100);

  if (showResults) {
    const percentage = Math.round((score / exam.questions.length) * 100);
    return (
      <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">{percentage >= 60 ? "🎉" : "📚"}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Completed!</h1>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl mb-6">
            <div className="text-5xl font-bold">{percentage}%</div>
          </div>
          <Link href={`/exam/${subject}/${examId}/review`} className="block w-full py-3 bg-purple-600 text-white rounded-xl font-bold mb-3">Review Answers</Link>
          <Link href={`/courses/${subject}`} className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">Back to Course</Link>
        </div>
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 
        HEADER المعدل: 
        نفس الفكرة، بنشيل شرط الـ session وبنخلي الزر Dashboard يظهر دائماً
      */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-16 h-16" />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* زر Dashboard ثابت */}
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
              🏠 Dashboard
            </Link>
            
            <div className={`text-xl font-bold px-4 py-2 rounded-xl font-mono ${timeLeft < 300 ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-100 text-blue-600"}`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-5 mb-8">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl">{currentQuestion + 1}</div>
            <h2 className="text-2xl font-bold text-gray-900">{currentQ.text}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option, idx) => {
              const label = options[idx];
              const isSelected = answers[currentQ.id] === label;
              return (
                <button key={label} onClick={() => handleAnswer(currentQ.id, label)} className={`p-5 rounded-xl border-2 text-left text-lg transition ${isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}>
                  <span className="font-bold mr-3">{label}.</span> {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 rounded-xl disabled:opacity-50">Previous</button>
          {currentQuestion === exam.questions.length - 1 ? (
            <button onClick={handleSubmit} disabled={Object.keys(answers).length < exam.questions.length} className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold disabled:opacity-50">Submit</button>
          ) : (
            <button onClick={() => setCurrentQuestion((prev) => prev + 1)} className="px-6 py-3 bg-blue-600 text-white rounded-xl">Next</button>
          )}
        </div>
      </main>
    </div>
  );
}