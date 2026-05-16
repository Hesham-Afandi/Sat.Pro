import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addEnglishContent() {
  console.log('📖 بدء إضافة محتوى الإنجليزي...');
  try {
    const course = await prisma.course.findFirst({ where: { subject: 'English' } });
    if (!course) return console.log('❌ Course not found');

    await prisma.lesson.createMany({
      data: [
        { title: 'Reading Strategies', description: 'Active reading, main idea, inference.', videoUrl: 'https://www.khanacademy.org/sat/test-prep/sat-reading-writing', duration: '40:00', order: 1, courseId: course.id },
        { title: 'Command of Evidence', description: 'Supporting claims with text evidence.', videoUrl: 'https://www.khanacademy.org/sat/test-prep/sat-reading-writing/command-of-evidence', duration: '38:00', order: 2, courseId: course.id },
        { title: 'Standard English Grammar', description: 'Punctuation, sentence structure.', videoUrl: 'https://www.khanacademy.org/sat/test-prep/sat-reading-writing/standard-english-conventions', duration: '45:00', order: 3, courseId: course.id },
        { title: 'Expression of Ideas', description: 'Topic development, organization.', videoUrl: 'https://www.khanacademy.org/sat/test-prep/sat-reading-writing/expression-of-ideas', duration: '42:00', order: 4, courseId: course.id },
      ],
      skipDuplicates: true
    });

    await prisma.exam.createMany({
      data: [
        { title: 'Reading Test', subject: 'English', duration: '40', totalQuestions: 15, courseId: course.id },
        { title: 'Grammar Test', subject: 'English', duration: '35', totalQuestions: 12, courseId: course.id },
      ],
      skipDuplicates: true
    });

    console.log('✅ تم إضافة محتوى الإنجليزي بنجاح!');
  } finally { await prisma.$disconnect(); }
}
addEnglishContent();