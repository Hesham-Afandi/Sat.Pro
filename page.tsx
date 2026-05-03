"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LandingPage() {
  const { data: session } = useSession();
  const { t, dir } = useLanguage();

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-20 h-20" />
            </Link>

            <nav className="hidden md:flex gap-8 items-center">
              <Link href="#features" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                {t("features")}
              </Link>
              <Link href="#subjects" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                {t("subjects")}
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-semibold transition">
                {t("pricing")}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {session ? (
                <Link 
                  href="/dashboard" 
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition transform"
                >
                  {t("dashboard")}
                </Link>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="hidden sm:block px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition"
                  >
                    {t("signIn")}
                  </Link>
                  <Link 
                    href="/register" 
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition transform"
                  >
                    {t("getStarted")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`text-center lg:text-${dir === "rtl" ? "right" : "left"}`}>
              <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                {t("hero_badge")}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                {t("hero_title_1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t("hero_title_2")}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t("hero_description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform"
                >
                  {t("start_free_trial")}
                </Link>
                <Link 
                  href="#features" 
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition"
                >
                  {t("learn_more")}
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className={`text-center lg:text-${dir === "rtl" ? "right" : "left"}`}>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">{t("students")}</div>
                </div>
                <div className={`text-center lg:text-${dir === "rtl" ? "right" : "left"}`}>
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600">{t("success_rate")}</div>
                </div>
                <div className={`text-center lg:text-${dir === "rtl" ? "right" : "left"}`}>
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-sm text-gray-600">{t("tests_taken")}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
                <Logo className="w-full h-auto" />
                
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                  <div className="text-4xl">🎓</div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-2xl shadow-xl animate-bounce delay-500">
                  <div className="text-4xl">📚</div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                    <span className="font-semibold text-gray-800">Personalized Study Plan</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">✓</div>
                    <span className="font-semibold text-gray-800">Real-time Progress Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("why_choose_us")}</h2>
            <p className="text-xl text-gray-600">{t("why_choose_us_desc")}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition border border-blue-100">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("smart_analytics")}</h3>
              <p className="text-gray-600">{t("smart_analytics_desc")}</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition border border-purple-100">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("practice_tests")}</h3>
              <p className="text-gray-600">{t("practice_tests_desc")}</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl hover:shadow-xl transition border border-green-100">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("video_lessons")}</h3>
              <p className="text-gray-600">{t("video_lessons_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Logo className="w-16 h-16 mx-auto mb-4" />
          <p>© 2026 SAT PRO. {t("footer_rights")}</p>
        </div>
      </footer>
    </div>
  );
}