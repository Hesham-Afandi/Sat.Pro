"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const {  session, status } = useSession();
  const router = useRouter();
  const { t, dir } = useLanguage(); // ✅ استخدام الترجمة
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-bold text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Logo href="/dashboard" className="w-12 h-12" />
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
                <span className="font-medium text-gray-700 hidden md:block">
                  {session?.user?.name || "Student"}
                </span>
              </div>
              
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
              >
                {t("signOut")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("welcome")}, {session?.user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your learning journey today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("activeCourses")}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">3</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                📚
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("examsTaken")}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">12</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("averageScore")}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">85%</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                🏆
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t("myCourses")}</h2>
            
            {/* Course Cards */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Mathematics - Advanced</h3>
                <p className="text-sm text-gray-500 mb-2">{t("progress")}: 75%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <Link 
                href="/courses/math" 
                className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition text-sm whitespace-nowrap"
              >
                {t("continue")}
              </Link>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                ⚛️
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Physics - Mechanics</h3>
                <p className="text-sm text-gray-500 mb-2">{t("progress")}: 40%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <Link 
                href="/courses/physics" 
                className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition text-sm whitespace-nowrap"
              >
                {t("continue")}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t("quickActions")}</h2>
            
            <Link href="/courses" className="block bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg">{t("browseCourses")}</h3>
              <p className="text-blue-100 text-sm mt-1">Explore new subjects to learn</p>
            </Link>

            <Link href="/exams" className="block bg-gradient-to-br from-purple-600 to-pink-700 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-lg">{t("takeQuiz")}</h3>
              <p className="text-purple-100 text-sm mt-1">Test your knowledge</p>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}