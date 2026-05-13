import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaClientPG } from '@prisma/client';

// ✅ Prisma Client للـ SQLite (القديمة)
const prismaOld = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db',
    },
  },
});

// ✅ Prisma Client للـ PostgreSQL (الجديدة)
const prismaNew = new PrismaClientPG();

async function migrateData() {
  try {
    console.log('📤 Starting data migration from SQLite to PostgreSQL...\n');

    // 1️⃣ انقل الكورسات
    console.log('📚 Migrating Courses...');
    const courses = await prismaOld.course.findMany();
    console.log(`   Found ${courses.length} courses`);
    
    for (const course of courses) {
      await prismaNew.course.create({
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
          subject: course.subject,
          category: course.category,
          level: course.level,
          isPublished: course.isPublished,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
        },
      });
    }
    console.log(`   ✅ Migrated ${courses.length} courses\n`);

    // 2️⃣ انقل الامتحانات
    console.log('📝 Migrating Exams...');
    const exams = await prismaOld.exam.findMany();
    console.log(`   Found ${exams.length} exams`);
    
    for (const exam of exams) {
      await prismaNew.exam.create({
        data: {
          id: exam.id,
          title: exam.title,
          subject: exam.subject,
          duration: exam.duration,
          totalQuestions: exam.totalQuestions,
          courseId: exam.courseId,
          createdAt: exam.createdAt,
          updatedAt: exam.updatedAt,
        },
      });
    }
    console.log(`   ✅ Migrated ${exams.length} exams\n`);

    // 3️⃣ انقل الأسئلة
    console.log('❓ Migrating Questions...');
    const questions = await prismaOld.question.findMany();
    console.log(`   Found ${questions.length} questions`);
    
    for (const question of questions) {
      await prismaNew.question.create({
        data: {
          id: question.id,
          text: question.text,
          type: question.type,
          examId: question.examId,
          courseId: question.courseId,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        },
      });
    }
    console.log(`   ✅ Migrated ${questions.length} questions\n`);

    // 4️⃣ انقل الدروس
    console.log('📖 Migrating Lessons...');
    const lessons = await prismaOld.lesson.findMany();
    console.log(`   Found ${lessons.length} lessons`);
    
    for (const lesson of lessons) {
      await prismaNew.lesson.create({
        data: {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.videoUrl,
          order: lesson.order,
          courseId: lesson.courseId,
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt,
        },
      });
    }
    console.log(`   ✅ Migrated ${lessons.length} lessons\n`);

    // 5️⃣ انقل المستخدمين
    console.log('👤 Migrating Users...');
    const users = await prismaOld.user.findMany();
    console.log(`   Found ${users.length} users`);
    
    for (const user of users) {
      await prismaNew.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          password: user.password,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }
    console.log(`   ✅ Migrated ${users.length} users\n`);

    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prismaOld.$disconnect();
    await prismaNew.$disconnect();
  }
}

migrateData();
