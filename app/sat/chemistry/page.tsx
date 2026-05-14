'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string | null;
  level: string;
  isPublished: boolean;
}

export default function SATChemistryPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses?subject=Chemistry&category=SAT');
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* الهيدر */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 text-white text-center mb-8">
          <div className="text-6xl mb-4">🧪</div>
          <h1 className="text-4xl font-bold mb-2">SAT Chemistry</h1>
          <p className="text-green-100">
            كيمياء عضوية • غير عضوية • تحليلية • فيزيائية
          </p>
        </div>

        {/* الرجوع */}
        <div className="mb-6">
          <Link 
            href="/sat" 
            className="inline-flex items-center text-green-600 hover:text-green-800"
          >
            ← العودة لصفحة SAT
          </Link>
        </div>

        {/* الكورسات */}
        {loading ? (
          <div className="text-center py-12">جاري التحميل...</div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">لا توجد كورسات حالياً</h3>
            <p className="text-gray-500">الكورسات هتتضاف قريباً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border-r-4 border-green-500"
              >
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description || 'وصف الكورس'}
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {course.level === 'beginner' ? 'مبتدئ' : 
                   course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* الامتحانات */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            الامتحانات التجريبية
          </h2>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-600 text-center py-8">
              الامتحانات هتتضاف قريباً 📝
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}