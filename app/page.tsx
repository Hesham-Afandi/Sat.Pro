"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const {  session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-xl font-bold text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo href="/" className="w-12 h-12" />
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {session ? (
              <Link 
                href="/dashboard" 
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold hover:shadow-lg transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SAT Exam</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of students achieving their dream scores with our comprehensive SAT preparation platform.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition transform"
            >
              Start Free Trial
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition"
            >
              Learn More
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Study Plan</h3>
              <p className="text-gray-600">Customized learning path tailored to your needs</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Progress Tracking</h3>
              <p className="text-gray-600">Monitor your improvement with detailed analytics</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from experienced SAT tutors</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}