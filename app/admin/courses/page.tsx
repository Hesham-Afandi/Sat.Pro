import { PrismaClient } from "@prisma/client";
import { createCourse, deleteCourse } from "@/app/actions/admin";
import Link from "next/link"; // ✅ ده اللي كان ناقص!

const prisma = new PrismaClient();

export default async function ManageCourses() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📚 إدارة الكورسات</h1>

      {/* نموذج الإضافة */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">إضافة كورس جديد</h3>
        <form action={createCourse} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">عنوان الكورس</label>
            <input name="title" required placeholder="مثال: شرح الوحدة الأولى" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">المادة</label>
            <select name="subject" className="w-full border p-2 rounded bg-white">
              <option value="math">رياضيات</option>
              <option value="physics">فيزياء</option>
              <option value="chemistry">كيمياء</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">الوصف</label>
            <input name="description" placeholder="وصف قصير..." className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-bold">
            ➕ إضافة
          </button>
        </form>
      </div>

      {/* جدول الكورسات */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">العنوان</th>
              <th className="p-4 font-semibold text-gray-600">المادة</th>
              <th className="p-4 font-semibold text-gray-600">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{course.title}</td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                    {course.subject === 'math' ? 'رياضيات' : course.subject === 'physics' ? 'فيزياء' : 'كيمياء'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {/* ✅ زر إدارة الدروس */}
                  <Link 
                    href={`/admin/courses/${course.id}`} 
                    className="text-blue-600 hover:underline text-sm font-bold bg-blue-50 px-3 py-1 rounded"
                  >
                    🎥 إدارة الدروس
                  </Link>

                  {/* زر الحذف */}
                  <form action={deleteCourse.bind(null, course.id)} className="inline">
                    <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-bold bg-red-50 px-3 py-1 rounded hover:bg-red-100 transition">
                      🗑️ حذف
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">لا توجد كورسات حالياً. أضف كورس من الأعلى!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}