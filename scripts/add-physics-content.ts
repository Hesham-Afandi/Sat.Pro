import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addPhysicsContent() {
  console.log('⚛️ بدء إضافة محتوى الفيزياء...');
  try {
    const course = await prisma.course.findFirst({ where: { subject: 'Physics' } });
    if (!course) return console.log('❌ Course not found');

    await prisma.lesson.createMany({
      data: [
        { title: 'Kinematics & Motion', description: 'Displacement, velocity, acceleration.', videoUrl: 'https://www.khanacademy.org/science/physics/one-dimensional-motion', duration: '42:00', order: 1, courseId: course.id },
        { title: "Newton's Laws", description: 'Force, mass, acceleration, free-body diagrams.', videoUrl: 'https://www.khanacademy.org/science/physics/forces-newtons-laws', duration: '48:00', order: 2, courseId: course.id },
        { title: 'Work & Energy', description: 'Kinetic/potential energy, conservation laws.', videoUrl: 'https://www.khanacademy.org/science/physics/work-and-energy', duration: '45:00', order: 3, courseId: course.id },
        { title: 'Electricity & Circuits', description: 'Ohm\'s law, series/parallel circuits.', videoUrl: 'https://www.khanacademy.org/science/physics/electricity-and-magnetism', duration: '50:00', order: 4, courseId: course.id },
      ],
      skipDuplicates: true
    });

    await prisma.exam.createMany({
      data: [
        { title: 'Mechanics Test', subject: 'Physics', duration: '45', totalQuestions: 12, courseId: course.id },
        { title: 'Electricity Test', subject: 'Physics', duration: '40', totalQuestions: 10, courseId: course.id },
      ],
      skipDuplicates: true
    });

    console.log('✅ تم إضافة محتوى الفيزياء بنجاح!');
  } finally { await prisma.$disconnect(); }
}
addPhysicsContent();