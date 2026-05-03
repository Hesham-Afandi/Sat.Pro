import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📝 Adding exam questions...');

  // 1. نجيب الامتحان
  const exam = await prisma.exam.findFirst({
    where: {
      subject: 'math',
      title: 'امتحان الرياضيات التجريبي'
    }
  });

  if (!exam) {
    console.log('❌ Exam not found!');
    return;
  }

  console.log('✅ Found exam:', exam.id);

  // 2. نضيف الأسئلة
  const questions = await prisma.question.createMany({
    data: [
      {
        examId: exam.id,
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
        examId: exam.id,
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
        examId: exam.id,
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
  });

  console.log(`✅ Added ${questions.count} questions!`);
  console.log('🎉 Done!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());