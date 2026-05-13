import { PrismaClient } from '@prisma/client';

const oldDb = new PrismaClient({
  datasources: { db: { url: 'file:./dev.db' } }
});

const newDb = new PrismaClient();

async function migrateData() {
  console.log('🚀 بدء نقل البيانات...\n');
  
  try {
    // 1. الكورسات - الحقول المتاحة بس
    const courses = await oldDb.course.findMany();
    console.log(`📚 نقل ${courses.length} كورس...`);
    
    for (const c of courses) {
      try {
        await newDb.course.upsert({
          where: { id: c.id },
          update: {},
          create: {
            id: c.id,
            title: c.title,
            description: c.description,
            // ⚠️ الحقول التانية مش موجودة في الـ schema الجديد
          }
        });
      } catch (err: any) {
        console.log(`   ⚠️  Course ${c.id}: ${err.message}`);
      }
    }

    // 2. الامتحانات - الحقول المتاحة بس
    const exams = await oldDb.exam.findMany();
    console.log(`📝 نقل ${exams.length} امتحان...`);
    
    for (const e of exams) {
      try {
        await newDb.exam.upsert({
          where: { id: e.id },
          update: {},
          create: {
            id: e.id,
            title: e.title,
            subject: e.subject,
            duration: e.duration,
            courseId: e.courseId,
            // ⚠️ totalQuestions مش موجود
          }
        });
      } catch (err: any) {
        console.log(`   ⚠️  Exam ${e.id}: ${err.message}`);
      }
    }

    // 3. الأسئلة
    const questions = await oldDb.question.findMany();
    console.log(`❓ نقل ${questions.length} سؤال...`);
    
    for (const q of questions) {
      try {
        await newDb.question.upsert({
          where: { id: q.id },
          update: {},
          create: {
            id: q.id,
            text: q.text,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation,
            examId: q.examId,
          }
        });
      } catch (err: any) {
        console.log(`   ⚠️  Question: ${err.message}`);
      }
    }

    // 4. الدروس
    const lessons = await oldDb.lesson.findMany();
    console.log(`📖 نقل ${lessons.length} درس...`);
    
    for (const l of lessons) {
      try {
        await newDb.lesson.upsert({
          where: { id: l.id },
          update: {},
          create: {
            id: l.id,
            title: l.title,
            courseId: l.courseId,
            videoUrl: l.videoUrl,
            duration: l.duration,
            completed: l.completed,
          }
        });
      } catch (err: any) {
        console.log(`   ⚠️  Lesson: ${err.message}`);
      }
    }

    console.log('\n✅ تم النقل بنجاح!');
    
  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await oldDb.$disconnect();
    await newDb.$disconnect();
  }
}

migrateData();