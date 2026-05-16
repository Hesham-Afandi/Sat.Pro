import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { course: true }
  });

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <Link href={`/courses/${lesson.courseId}`} className="text-indigo-600 mb-6 inline-block">
          ← العودة للكورس
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-600 mb-6">{lesson.description}</p>
          
          {/* الفيديو */}
          {lesson.videoUrl && (
            <div className="aspect-video bg-gray-900 rounded-xl mb-6 overflow-hidden">
              <iframe 
                src={lesson.videoUrl}
                title={lesson.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>⏱️ {lesson.duration}</span>
            <span>📚 الدرس {lesson.order}</span>
          </div>

          {/* المحتوى النصي */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">محتوى الدرس</h2>
            <p className="text-gray-700 leading-relaxed">
              {lesson.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}