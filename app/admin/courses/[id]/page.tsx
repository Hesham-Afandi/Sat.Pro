import { PrismaClient } from "@prisma/client";
import { createLesson, deleteLesson } from "@/app/actions/admin";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function CourseLessonsPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { lessons: { orderBy: { order: "asc" } } },
  });

  if (!course) {
    return <div className="p-8 text-center">الكورس مش موجود</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/admin/courses" className="text-blue-600 hover:underline text-sm">← رجوع للكورسات</Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">📚 {course.title}</h1>
        </div>
      </div>

      {/* نموذج إضافة درس */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">➕ إضافة درس جديد</h3>
        <form action={createLesson} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="hidden" name="courseId" value={course.id} />
          
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">عنوان الدرس</label>
            <input name="title" required placeholder="مثال: الدرس الأول - المقدمة" className="w-full border p-2 rounded" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">رابط الفيديو (YouTube Embed)</label>
            <input 
              name="videoUrl" 
              required 
              placeholder="https://www.youtube.com/embed/..." 
              className="w-full border p-2 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">💡 اذهب لليوتيوب → Share → Embed → انسخ الرابط</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">الوصف (اختياري)</label>
            <textarea name="description" rows={3} className="w-full border p-2 rounded" />
          </div>

          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-bold md:col-span-2">
            💾 حفظ الدرس
          </button>
        </form>
      </div>

      {/* قائمة الدروس */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-bold text-gray-700">📋 الدروس المضافة ({course.lessons.length})</h3>
        </div>
        <div className="divide-y">
          {course.lessons.map((lesson, index) => (
            <div key={lesson.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                  {lesson.description && <p className="text-sm text-gray-500">{lesson.description}</p>}
                </div>
              </div>
              <form action={deleteLesson.bind(null, lesson.id, course.id)}>
                <button type="submit" className="text-red-500 hover:bg-red-50 px-3 py-1 rounded text-sm font-bold transition">
                  🗑️ حذف
                </button>
              </form>
            </div>
          ))}
          {course.lessons.length === 0 && (
            <div className="p-8 text-center text-gray-500">مفيش دروس مضافة لسه. ابدأ بإضافة أول درس!</div>
          )}
        </div>
      </div>
    </div>
  );
}