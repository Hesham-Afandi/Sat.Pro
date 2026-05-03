"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react"; // لسه محتاجينه عشان البيانات بس
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { coursesData } from "@/data/courses";

export default function CoursePage() {
  const params = useParams();
  const { t, dir } = useLanguage();
  // مش محتاجين نفحص الـ session هنا عشان الـ Header، هنخليه ثابت
  const {  session } = useSession(); 
  const courseId = params.id as string;
  const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "exams">("overview");

  const course = coursesData[courseId] || coursesData["math"];

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* 
        HEADER المعدل: 
        هنا شيلنا شرط الـ session. 
        دلوقتي الصفحة هتظهر دائماً وكأنك مسجل دخول (بتظهر Dashboard) 
        عشان متشوفش "Sign In" جوه المنصة.
      */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Logo className="w-16 h-16" />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* الزر ده هيظهر دائماً هنا */}
            <Link 
              href="/dashboard" 
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>🏠</span>
              {t("dashboard") || "Dashboard"}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Course Hero */}
        <div className={`h-64 bg-gradient-to-br ${course.color} rounded-3xl mb-8 flex items-center justify-center relative overflow-hidden shadow-xl`}>
          <div className="text-9xl absolute opacity-20 animate-pulse">{course.image}</div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-md">{course.title}</h1>
            <p className="text-lg opacity-90">👨🏫 {course.instructor}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
          {(["overview", "lessons", "exams"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 md:px-6 md:py-3 font-bold capitalize transition whitespace-nowrap ${
                activeTab === tab ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab === "overview" ? "Overview" : tab === "lessons" ? `Lessons (${course.lessons.length})` : `Exams (${course.exams.length})`}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{course.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600">{course.lessons.length}</div>
                    <div className="text-xs text-gray-600 mt-1">Lessons</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-600">{course.exams.length}</div>
                    <div className="text-xs text-gray-600 mt-1">Exams</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600">{course.duration}</div>
                    <div className="text-xs text-gray-600 mt-1">Duration</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="space-y-4">
                {course.lessons.map((lesson, idx) => (
                  <div key={lesson.id} className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${lesson.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                      {lesson.completed ? "✓" : idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">⏱️ {lesson.duration}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                      {lesson.completed ? "Review" : "Start"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-4">
                {course.exams.map((exam) => (
                  <div key={exam.id} className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">📝</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-500">{exam.questions} Questions • {exam.duration}</p>
                    </div>
                    <Link 
                      href={`/exam/${exam.subject}/${exam.id}`}
                      className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-md transition"
                    >
                      Start
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <span>Completed</span>
                  <span className="font-bold text-blue-600">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all" style={{ width: "40%" }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link href="/courses" className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200 transition">
                  ← Back to Courses
                </Link>
                {course.exams.length > 0 && (
                  <Link 
                    href={`/exam/${course.subject}/${course.exams[0].id}`}
                    className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-center hover:shadow-lg transition"
                  >
                    🚀 Take First Exam
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}