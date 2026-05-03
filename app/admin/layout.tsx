import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // 🔒 حماية: السماح للأدمن فقط
  if (!session || session.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex">
      {/* القائمة الجانبية Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-400 border-b border-slate-700 pb-4">
          👨‍ لوحة الأدمن
        </h2>
        
        <nav className="flex flex-col gap-3">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition">
            📊 الإحصائيات
          </Link>
          <Link href="/admin/courses" className="block px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition">
            📚 إدارة الكورسات
          </Link>
          <Link href="/admin/exams" className="block px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition">
            📝 إدارة الامتحانات
          </Link>
          <Link href="/dashboard" className="mt-auto px-4 py-3 bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition">
            🏠 لوحة الطالب
          </Link>
        </nav>
      </aside>

      {/* المحتوى الرئيسي Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}