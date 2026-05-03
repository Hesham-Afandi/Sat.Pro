"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSession } from "next-auth/react";
import { coursesData } from "@/data/courses";

export default function CoursesPage() {
  const { t, dir } = useLanguage();
  const {  session, status } = useSession();
  const courses = Object.values(coursesData);

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Logo className="w-16 h-16" />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {status === "loading" ? (
              <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <Link href="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">Choose a subject to start learning</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition transform">
              <div className={`h-48 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                <div className="text-8xl">{course.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
                <Link 
                  href={`/courses/${course.id}`}
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-center hover:shadow-lg hover:scale-105 transition transform"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}