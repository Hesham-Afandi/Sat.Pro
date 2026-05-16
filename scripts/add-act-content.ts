import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addACTContent() {
  console.log(' بدء إضافة محتوى ACT...\n');

  try {
    // 1. إنشاء كورسات ACT الأربعة
    console.log(' إنشاء كورسات ACT...');
    const actCourses = await Promise.all([
      prisma.course.create({
        data: {
          title: 'ACT Mathematics',
          description: 'كورس شامل لرياضيات الـ ACT يغطي الجبر، الهندسة، والثلاثيات',
          subject: 'Math',
          category: 'ACT',
          level: 'comprehensive',
          isPublished: true,
        },
      }),
      prisma.course.create({
        data: {
          title: 'ACT English',
          description: 'كورس شامل لقواعد اللغة الإنجليزية والكتابة للـ ACT',
          subject: 'English',
          category: 'ACT',
          level: 'comprehensive',
          isPublished: true,
        },
      }),
      prisma.course.create({
        data: {
          title: 'ACT Reading',
          description: 'كورس شامل لمهارات القراءة والاستيعاب للـ ACT',
          subject: 'Reading',
          category: 'ACT',
          level: 'comprehensive',
          isPublished: true,
        },
      }),
      prisma.course.create({
        data: {
          title: 'ACT Science',
          description: 'كورس شامل لتفسير البيانات والرسوم البيانية العلمية للـ ACT',
          subject: 'Science',
          category: 'ACT',
          level: 'comprehensive',
          isPublished: true,
        },
      }),
    ]);

    console.log(`✅ تم إنشاء ${actCourses.length} كورس لـ ACT\n`);

    // 2. إضافة دروس لكل كورس (نسخة مبسطة من محتوى SAT كنموذج)
    const coursesMap = [
      { course: actCourses[0], subject: 'Math', lessons: ['Algebra Basics', 'Geometry Fundamentals', 'Trigonometry Intro'] },
      { course: actCourses[1], subject: 'English', lessons: ['Punctuation Rules', 'Grammar Essentials', 'Sentence Structure'] },
      { course: actCourses[2], subject: 'Reading', lessons: ['Prose Fiction', 'Social Science', 'Natural Science'] },
      { course: actCourses[3], subject: 'Science', lessons: ['Data Representation', 'Research Summaries', 'Conflicting Viewpoints'] },
    ];

    for (const item of coursesMap) {
      console.log(`📝 إضافة دروس لـ ${item.course.title}...`);
      const lessonsData = item.lessons.map((title, index) => ({
        title: `${item.subject} Lesson ${index + 1}: ${title}`,
        description: `شرح مفصل لموضوع ${title} في اختبار ACT`,
        videoUrl: 'https://example.com', // رابط فيديو مؤقت
        duration: '30:00',
        order: index + 1,
        courseId: item.course.id,
      }));

      await prisma.lesson.createMany({ data: lessonsData });
      console.log(`   ✅ أضيف ${lessonsData.length} درس`);
    }

    // 3. إضافة امتحان تجريبي لكل مادة
    console.log('\n📝 إضافة امتحانات ACT...');
    const examsData = actCourses.map((course) => ({
      title: `Full ${course.subject} Practice Test (ACT)`,
      subject: course.subject,
      duration: '60',
      totalQuestions: 60, // ACT عادة أسئلة سريعة وكثيرة
      courseId: course.id,
    }));

    await prisma.exam.createMany({ data: examsData });
    console.log(`✅ تم إضافة ${examsData.length} امتحان لـ ACT\n`);

    console.log(' تم إضافة محتوى ACT بنجاح!');
    console.log('💡 ملاحظة: يمكنك نسخ أسئلة SAT لـ ACT إذا كانت متشابهة، أو إضافة أسئلة ACT مخصصة.');

  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addACTContent();