import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const session = await auth();
  
  // جلب الإحصائيات من الداتابيز
  const [coursesCount, examsCount, usersCount] = await Promise.all([
    prisma.course.count(),
    prisma.exam.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          أهلاً بك، {session?.user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-2">إليك ملخص سريع لمنصتك التعليمية.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* بطاقة الكورسات */}
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-blue-500">
          <div className="text-gray-500 text-sm font-medium">إجمالي الكورسات</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{coursesCount}</div>
        </div>

        {/* بطاقة الامتحانات */}
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-green-500">
          <div className="text-gray-500 text-sm font-medium">إجمالي الامتحانات</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{examsCount}</div>
        </div>

        {/* بطاقة المستخدمين */}
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-purple-500">
          <div className="text-gray-500 text-sm font-medium">المستخدمين المسجلين</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{usersCount}</div>
        </div>
      </div>
    </div>
  );
}