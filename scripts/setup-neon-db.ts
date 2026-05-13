import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log('🚀 إعداد قاعدة البيانات في Neon...\n');
  
  try {
    // 1. الكورسات
    console.log('📚 إنشاء الكورسات...');
    const course1 = await prisma.course.create({
      data: {
        title: 'Math SAT Complete Course',
        description: 'كورس شامل لتحضير اختبار الرياضيات',
        subject: 'Math',
        level: 'beginner',
        isPublished: true,
      },
    });

    const course2 = await prisma.course.create({
      data: {
        title: 'Reading & Writing SAT',
        description: 'تحضير شامل للقراءة والكتابة',
        subject: 'English',
        level: 'intermediate',
        isPublished: true,
      },
    });

    const course3 = await prisma.course.create({
      data: {
        title: 'Advanced Math SAT',
        description: 'كورس متقدم للرياضيات',
        subject: 'Math',
        level: 'advanced',
        isPublished: true,
      },
    });
    console.log('   ✅ تم إنشاء 3 كورس\n');

    // 2. الامتحانات
    console.log('📝 إنشاء الامتحانات...');
    const exam1 = await prisma.exam.create({
      data: {
        title: 'Math Practice Test 1',
        subject: 'Math',
        duration: '60',
        totalQuestions: 6,
        courseId: course1.id,
      },
    });

    const exam2 = await prisma.exam.create({
      data: {
        title: 'Reading Practice Test 1',
        subject: 'English',
        duration: '45',
        totalQuestions: 6,
        courseId: course2.id,
      },
    });

    const exam3 = await prisma.exam.create({
      data: {
        title: 'Advanced Math Test',
        subject: 'Math',
        duration: '60',
        totalQuestions: 6,
        courseId: course3.id,
      },
    });
    console.log('   ✅ تم إنشاء 3 امتحان\n');

    // 3. الأسئلة
    console.log('❓ إنشاء الأسئلة...');
    for (let i = 1; i <= 6; i++) {
      await prisma.question.create({
        data: {
          text: `Math Question ${i}`,
          options: '["A", "B", "C", "D"]',
          correct: 'A',
          examId: exam1.id,
        },
      });
    }

    for (let i = 1; i <= 6; i++) {
      await prisma.question.create({
        data: {
          text: `Reading Question ${i}`,
          options: '["A", "B", "C", "D"]',
          correct: 'A',
          examId: exam2.id,
        },
      });
    }

    for (let i = 1; i <= 6; i++) {
      await prisma.question.create({
        data: {
          text: `Advanced Math ${i}`,
          options: '["A", "B", "C", "D"]',
          correct: 'A',
          examId: exam3.id,
        },
      });
    }
    console.log('   ✅ تم إنشاء 18 سؤال\n');

    // 4. الدروس
    console.log('📖 إنشاء الدروس...');
    for (let i = 1; i <= 6; i++) {
      await prisma.lesson.create({
        data: {
          title: `Math Lesson ${i}`,
          videoUrl: 'https://example.com',
          duration: '10:00',
          order: i,
          courseId: course1.id,
        },
      });
    }

    for (let i = 1; i <= 6; i++) {
      await prisma.lesson.create({
        data: {
          title: `Reading Lesson ${i}`,
          videoUrl: 'https://example.com',
          duration: '10:00',
          order: i,
          courseId: course2.id,
        },
      });
    }

    for (let i = 1; i <= 6; i++) {
      await prisma.lesson.create({
        data: {
          title: `Advanced Math ${i}`,
          videoUrl: 'https://example.com',
          duration: '10:00',
          order: i,
          courseId: course3.id,
        },
      });
    }
    console.log('   ✅ تم إنشاء 18 درس\n');

    console.log('🎉 تم إعداد قاعدة البيانات بنجاح!');
  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();