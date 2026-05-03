"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  price: number;
  isPublished: boolean;
}

interface Subscription {
  id: string;
  courseId: string;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
  course: Course;
}

export default function SubscriptionsPage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/subscriptions")
      .then((res) => {
        if (!res.ok) throw new Error("فشل في جلب الاشتراكات");
        return res.json();
      })
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">❌ خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">📚 اشتراكاتي</h1>
          <p className="text-gray-600 mt-2">إدارة المواد والدورات المشتركة فيها</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {subscriptions.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-lg p-12">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">ما عندكش اشتراكات حالياً</h2>
            <p className="text-gray-600 mb-6">اشترك في المواد عشان تقدر تاخد الامتحانات</p>
            <Link
              href="/courses"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition"
            >
              تصفح المواد المتاحة
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  sub.isActive ? "border-green-500" : "border-gray-300"
                }`}
              >
                {/* Card Header */}
                <div className={`p-4 ${sub.isActive ? "bg-green-50" : "bg-gray-100"}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{sub.course.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{sub.course.subject}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        sub.isActive
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {sub.isActive ? "نشط ✓" : "منتهي ✗"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">
                    {sub.course.description || "لا يوجد وصف"}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ الاشتراك:</span>
                      <span className="font-bold">
                        {new Date(sub.startDate).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                    {sub.endDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ الانتهاء:</span>
                        <span className="font-bold">
                          {new Date(sub.endDate).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">السعر:</span>
                      <span className="font-bold text-purple-700">
                        {sub.course.price === 0 ? "مجاني" : `${sub.course.price} جنيه`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-2">
                    <Link
                      href={`/exam/${sub.course.subject}`}
                      className="block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition"
                    >
                      📝 الامتحانات
                    </Link>
                    {sub.course.subject === "math" && (
                      <Link
                        href="/courses/math"
                        className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                      >
                        📖 المحتوى التعليمي
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-gray-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-700 transition"
          >
            ← العودة للداشبورد
          </Link>
        </div>
      </main>
    </div>
  );
}