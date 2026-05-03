import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📝 Creating exams...');

  // امتحان رياضيات
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
            questionText: 'إذا كان 2x + 3 = 11، فما قيمة x؟',
            optionA: '2',
            optionB: '3',
            optionC: '4',
            optionD: '5',
            correctAnswer: 'C',
            marks: 10,
            orderIndex: 0,
          },
          {
            questionText: 'ما هو حل المعادلة: x² - 5x + 6 = 0؟',
            optionA: 'x = 2 أو x = 3',
            optionB: 'x = 1 أو x = 6',
            optionC: 'x = -2 أو x = -3',
            optionD: 'x = 0 أو x = 5',
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

  // امتحان فيزياء
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
  console.log('🎉 Exams seed completed!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());