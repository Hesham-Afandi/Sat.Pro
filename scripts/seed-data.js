const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...\n');

  // حذف الداتا القديمة
  await prisma.examResult.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.question.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Old data cleared\n');

  // 1. إنشاء مستخدمين
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 'أحمد محمد',
      email: 'ahmed@test.com',
      password: hashedPassword,
      emailVerified: new Date(),
      role: 'student',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'فاطمة علي',
      email: 'fatima@test.com',
      password: hashedPassword,
      emailVerified: new Date(),
      role: 'student',
    },
  });

  console.log('✅ Created 3 users\n');

  // 2. إنشاء المواد
  const mathCourse = await prisma.course.create({
    data: {
      title: 'الرياضيات المتقدمة',
      subject: 'math',
      description: 'شرح شامل للرياضيات - جبر وهندسة وحساب',
      price: 299,
      isPublished: true,
    },
  });

  const physicsCourse = await prisma.course.create({
    data: {
      title: 'الفيزياء العامة',
      subject: 'physics',
      description: 'الفيزياء الميكانيكية والكهرباء',
      price: 299,
      isPublished: true,
    },
  });

  const chemistryCourse = await prisma.course.create({
    data: {
      title: 'الكيمياء العضوية',
      subject: 'chemistry',
      description: 'شرح الكيمياء العضوية والتفاعلات',
      price: 299,
      isPublished: true,
    },
  });

  console.log('✅ Created 3 courses\n');

  // 3. إنشاء امتحانات
  const mathExam = await prisma.exam.create({
    data: {
      title: 'امتحان الرياضيات التجريبي',
      subject: 'math',
      description: 'امتحان شامل في الجبر والهندسة',
      totalMarks: 100,
      duration: 60,
    },
  });

  const physicsExam = await prisma.exam.create({
    data: {
      title: 'امتحان الفيزياء التجريبي',
      subject: 'physics',
      description: 'امتحان في الميكانيكا',
      totalMarks: 100,
      duration: 60,
    },
  });

  const chemistryExam = await prisma.exam.create({
    data: {
      title: 'امتحان الكيمياء التجريبي',
      subject: 'chemistry',
      description: 'امتحان في الكيمياء العضوية',
      totalMarks: 100,
      duration: 60,
    },
  });

  console.log('✅ Created 3 exams\n');

  // 4. إنشاء أسئلة
  await prisma.question.createMany({
    data: [
      {
        text: 'ما هو حل المعادلة: 2س + 5 = 15؟',
        options: JSON.stringify(['5', '10', '7.5', '3']),
        correct: 'A',
        explanation: '2س = 10، إذن س = 5',
        marks: 10,
        courseId: mathCourse.id,
      },
      {
        text: 'مساحة الدائرة التي نصف قطرها 7 سم تساوي:',
        options: JSON.stringify(['154', '44', '147', '49']),
        correct: 'A',
        explanation: 'المساحة = ط × نق² = 22/7 × 49 = 154',
        marks: 10,
        courseId: mathCourse.id,
      },
      {
        text: 'سرعة جسم تحرك مسافة 100 متر في 20 ثانية:',
        options: JSON.stringify(['5 م/ث', '10 م/ث', '2 م/ث', '20 م/ث']),
        correct: 'A',
        explanation: 'السرعة = المسافة ÷ الزمن = 100 ÷ 20 = 5 م/ث',
        marks: 10,
        courseId: physicsCourse.id,
      },
      {
        text: 'القوة المؤثرة على جسم كتلته 10 كجم وتسارعه 2 م/ث²:',
        options: JSON.stringify(['20 نيوتن', '5 نيوتن', '12 نيوتن', '100 نيوتن']),
        correct: 'A',
        explanation: 'القوة = الكتلة × التسارع = 10 × 2 = 20 نيوتن',
        marks: 10,
        courseId: physicsCourse.id,
      },
      {
        text: 'الصيغة الجزيئية للماء:',
        options: JSON.stringify(['H2O', 'CO2', 'H2O2', 'HO']),
        correct: 'A',
        explanation: 'الماء يتكون من ذرتين هيدروجين وذرة أكسجين',
        marks: 10,
        courseId: chemistryCourse.id,
      },
      {
        text: 'العدد الذري للكربون:',
        options: JSON.stringify(['6', '12', '8', '14']),
        correct: 'A',
        explanation: 'الكربون عدده الذري 6',
        marks: 10,
        courseId: chemistryCourse.id,
      },
    ],
  });

  console.log('✅ Created 6 questions\n');

  // 5. إنشاء اشتراكات
  await prisma.subscription.createMany({
    data: [
      { userId: user1.id, courseId: mathCourse.id, isActive: true },
      { userId: user1.id, courseId: physicsCourse.id, isActive: true },
      { userId: user2.id, courseId: chemistryCourse.id, isActive: true },
      { userId: user2.id, courseId: mathCourse.id, isActive: true },
    ],
  });

  console.log('✅ Created 4 subscriptions\n');

  // 6. نتائج امتحانات
  await prisma.examResult.create({
    data: {
      userId: user1.id,
      examId: mathExam.id,
      score: 90,
      totalMarks: 100,
      answers: JSON.stringify({ q1: 'A', q2: 'A' }),
      correctCount: 9,
    },
  });

  console.log('✅ Created 1 exam result\n');

  console.log('🎉 Seed completed!');
  console.log('\n📋 Test Accounts:');
  console.log('  ahmed@test.com / 123456');
  console.log('  fatima@test.com / 123456');
  console.log('\n📚 Courses: Math, Physics, Chemistry');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });