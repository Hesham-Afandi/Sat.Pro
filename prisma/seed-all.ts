import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting full seed...');

  // 1. حذف البيانات القديمة
  await prisma.userExamAttempt.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  console.log('🗑️  Old data cleared');

  // 2. إضافة كورس الرياضيات
  const mathCourse = await prisma.course.create({
    data: {
      title: 'رياضيات الـ SAT الشامل',
      subject: 'math',
      description: 'كورس شامل لرياضيات الـ SAT يغطي الجبر والهندسة',
      isPublished: true,
      lessons: {
        create: [
          { title: 'مقدمة الكورس + خطة المذاكرة', duration: '05:20', planRequired: 'free', orderIndex: 0 },
          { title: 'المعادلات الخطية من الدرجة الأولى', duration: '12:45', planRequired: 'basic', orderIndex: 1 },
          { title: 'المعادلات من الدرجة الثانية', duration: '15:30', planRequired: 'basic', orderIndex: 2 },
        ],
      },
    },
    include: { lessons: true },
  });
  console.log(`✅ Math course created with ${mathCourse.lessons.length} lessons`);

  // 3. إضافة كورس الفيزياء
  const physicsCourse = await prisma.course.create({
    data: {
      title: 'فيزياء (AP / الثانوية)',
      subject: 'physics',
      description: 'كورس فيزياء شامل يغطي الميكانيكا والكهرباء',
      isPublished: true,
      lessons: {
        create: [
          { title: 'الميكانيكا - الحركة المستقيمة', duration: '10:00', planRequired: 'free', orderIndex: 0 },
          { title: 'قوانين نيوتن', duration: '14:20', planRequired: 'basic', orderIndex: 1 },
        ],
      },
    },
    include: { lessons: true },
  });
  console.log(`✅ Physics course created with ${physicsCourse.lessons.length} lessons`);

  // 4. إضافة امتحان الرياضيات
  const mathExam = await prisma.exam.create({
    data: {
      title: 'امتحان الرياضيات التجريبي',
      subject: 'math',
      duration: 60,
      totalMarks: 100,
      isPublished: true,
      questions: {
        create: [
          {
            questionText: 'إذا كان 2س + 3 = 11، فما قيمة س؟',
            optionA: '2',
            optionB: '3',
            optionC: '4',
            optionD: '5',
            correctAnswer: 'C',
            marks: 10,
            orderIndex: 0,
          },
          {
            questionText: 'ما هو حل المعادلة: س² - 5س + 6 = 0؟',
            optionA: 'س = 2 أو س = 3',
            optionB: 'س = 1 أو س = 6',
            optionC: 'س = -2 أو س = -3',
            optionD: 'س = 0 أو س = 5',
            correctAnswer: 'A',
            marks: 10,
            orderIndex: 1,
          },
          {
            questionText: 'إذا كانت زاوية في مثلث = 90 درجة، فالمثلث يسمى:',
            optionA: 'متساوي الأضلاع',
            optionB: 'قائم الزاوية',
            optionC: 'منفرج الزاوية',
            optionD: 'حاد الزوايا',
            correctAnswer: 'B',
            marks: 10,
            orderIndex: 2,
          },
        ],
      },
    },
    include: { questions: true },
  });
  console.log(`✅ Math exam created with ${mathExam.questions.length} questions`);

  // 5. إضافة امتحان الفيزياء
  const physicsExam = await prisma.exam.create({
    data: {
      title: 'امتحان الفيزياء التجريبي',
      subject: 'physics',
      duration: 45,
      totalMarks: 100,
      isPublished: true,
      questions: {
        create: [
          {
            questionText: 'وحدة قياس القوة في النظام الدولي هي:',
            optionA: 'الجول',
            optionB: 'الوات',
            optionC: 'النيوتن',
            optionD: 'المتر',
            correctAnswer: 'C',
            marks: 10,
            orderIndex: 0,
          },
          {
            questionText: 'القوة = الكتلة × ...',
            optionA: 'السرعة',
            optionB: 'التسارع',
            optionC: 'المسافة',
            optionD: 'الزمن',
            correctAnswer: 'B',
            marks: 10,
            orderIndex: 1,
          },
        ],
      },
    },
    include: { questions: true },
  });
  console.log(`✅ Physics exam created with ${physicsExam.questions.length} questions`);

  console.log('🎉 All data seeded successfully!');
}

main()
  .catch(e => console.error('❌ Error:', e))
  .finally(async () => await prisma.$disconnect());