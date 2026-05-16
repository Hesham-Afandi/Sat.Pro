import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addChemistryContent() {
  console.log('🧪 بدء إضافة محتوى الكيمياء...');
  try {
    const course = await prisma.course.findFirst({ where: { subject: 'Chemistry' } });
    if (!course) return console.log('❌ Course not found');

    await prisma.lesson.createMany({
      data: [
        { title: 'Atomic Structure', description: 'Electrons, protons, periodic trends.', videoUrl: 'https://www.khanacademy.org/science/chemistry/atomic-structure-and-properties', duration: '44:00', order: 1, courseId: course.id },
        { title: 'Chemical Bonding', description: 'Ionic, covalent bonds, VSEPR theory.', videoUrl: 'https://www.khanacademy.org/science/chemistry/chemical-bonds', duration: '47:00', order: 2, courseId: course.id },
        { title: 'Stoichiometry', description: 'Balancing equations, mole ratios.', videoUrl: 'https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiometry', duration: '50:00', order: 3, courseId: course.id },
        { title: 'Acids & Bases', description: 'pH scale, titrations, buffers.', videoUrl: 'https://www.khanacademy.org/science/chemistry/acids-and-bases-topic', duration: '43:00', order: 4, courseId: course.id },
      ],
      skipDuplicates: true
    });

    await prisma.exam.createMany({
      data: [
        { title: 'Atomic & Bonding Test', subject: 'Chemistry', duration: '40', totalQuestions: 10, courseId: course.id },
        { title: 'Reactions Test', subject: 'Chemistry', duration: '45', totalQuestions: 12, courseId: course.id },
      ],
      skipDuplicates: true
    });

    console.log('✅ تم إضافة محتوى الكيمياء بنجاح!');
  } finally { await prisma.$disconnect(); }
}
addChemistryContent();