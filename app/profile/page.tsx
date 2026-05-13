// ⚠️ امسح كل القديم أولاً ثم الصق ده

import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// ✅ دالة لجلب بيانات المستخدم (للتجربة - هتتعدل لما نشغل الـ Auth)
async function getUserProfile() {
  // 🔹 مؤقت: نرجع بيانات تجريبية عشان الصفحة متقعش
  return {
    id: "demo-user",
    name: "مستخدم تجريبي",
    email: "demo@example.com",
    image: null,
    role: "user",
    createdAt: new Date(),
  };
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                {user.role === "admin" ? "مدير" : "طالب"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">كورسات مسجلة</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">امتحانات مكتملة</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
            <div className="text-gray-600 text-sm">ساعات دراسة</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/courses" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-medium text-gray-700">كورساتي</div>
            </Link>
            <Link href="/exam" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium text-gray-700">امتحاناتي</div>
            </Link>
            <Link href="/pricing" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition">
              <div className="text-2xl mb-2">💎</div>
              <div className="text-sm font-medium text-gray-700">الاشتراك</div>
            </Link>
            <Link href="/" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition">
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-sm font-medium text-gray-700">الرئيسية</div>
            </Link>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>⚠️ ملاحظة: تسجيل الدخول سيتم تفعيله بالكامل قريباً</p>
        </div>

      </div>
    </div>
  );
}
