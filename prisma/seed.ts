import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ==================== المواد ====================
  const mathCourse = await prisma.course.upsert({
    where: { id: 'math' },
    update: {},
    create: {
      id: 'math',
      title: 'الرياضيات المتقدمة - المستوى الأول',
      description: 'دورة شاملة تغطي الجبر والهندسة وحساب المثلثات.',
      color: 'from-blue-500 to-indigo-600',
      image: '📐',
      instructor: 'د. أحمد محمد',
    },
  });

  const physicsCourse = await prisma.course.upsert({
    where: { id: 'physics' },
    update: {},
    create: {
      id: 'physics',
      title: 'الفيزياء العامة - الميكانيكا',
      description: 'دراسة الحركة، القوى، والطاقة والديناميكا الحرارية.',
      color: 'from-purple-500 to-pink-600',
      image: '⚛️',
      instructor: 'د. فاطمة علي',
    },
  });

  const chemistryCourse = await prisma.course.upsert({
    where: { id: 'chemistry' },
    update: {},
    create: {
      id: 'chemistry',
      title: 'الكيمياء العضوية - الأساسيات',
      description: 'مقدمة في المركبات العضوية، التفاعلات، والروابط الكيميائية.',
      color: 'from-green-500 to-teal-600',
      image: '🧪',
      instructor: 'د. محمد أحمد',
    },
  });

  // ==================== دروس الرياضيات ====================
  await prisma.lesson.createMany({
    data: [
      { courseId: 'math', title: 'المعادلات الخطية', duration: '45 دقيقة', completed: false },
      { courseId: 'math', title: 'الدوال التربيعية', duration: '50 دقيقة', completed: false },
      { courseId: 'math', title: 'حساب المثلثات', duration: '60 دقيقة', completed: false },
    ],
  });

  // ==================== دروس الفيزياء ====================
  await prisma.lesson.createMany({
    data: [
      { courseId: 'physics', title: 'قوانين نيوتن', duration: '50 دقيقة', completed: false },
      { courseId: 'physics', title: 'الطاقة الحركية', duration: '45 دقيقة', completed: false },
      { courseId: 'physics', title: 'الدوائر الكهربائية', duration: '60 دقيقة', completed: false },
    ],
  });

  // ==================== دروس الكيمياء ====================
  await prisma.lesson.createMany({
    data: [
      { courseId: 'chemistry', title: 'الجدول الدوري', duration: '40 دقيقة', completed: false },
      { courseId: 'chemistry', title: 'الروابط التساهمية', duration: '55 دقيقة', completed: false },
      { courseId: 'chemistry', title: 'التفاعلات الكيميائية', duration: '50 دقيقة', completed: false },
    ],
  });

  // ==================== امتحانات الرياضيات ====================
  const mathExam1 = await prisma.exam.create({
    data: {
      id: 'math-exam-1',
      title: 'امتحان الجبر',
      duration: '30 دقيقة',
      subject: 'math',
      courseId: 'math',
    },
  });

  const mathExam2 = await prisma.exam.create({
    data: {
      id: 'math-exam-2',
      title: 'امتحان الهندسة',
      duration: '40 دقيقة',
      subject: 'math',
      courseId: 'math',
    },
  });

  // أسئلة امتحان الجبر
  await prisma.question.createMany({
    data: [
      {
        examId: mathExam1.id,
        text: 'What is the solution to: 2x + 5 = 15?',
        options: JSON.stringify(['5', '10', '7.5', '3']),
        correct: 'A',
        explanation: '2x + 5 = 15 → 2x = 10 → x = 5',
      },
      {
        examId: mathExam1.id,
        text: 'Solve: 3x - 7 = 8',
        options: JSON.stringify(['5', '3', '7', '15']),
        correct: 'A',
        explanation: '3x - 7 = 8 → 3x = 15 → x = 5',
      },
      {
        examId: mathExam1.id,
        text: 'If 2x = 10, what is x?',
        options: JSON.stringify(['5', '2', '10', '20']),
        correct: 'A',
        explanation: '2x = 10 → x = 5',
      },
    ],
  });

  // أسئلة امتحان الهندسة
  await prisma.question.createMany({
    data: [
      {
        examId: mathExam2.id,
        text: 'What is the area of a circle with radius 7cm?',
        options: JSON.stringify(['154 cm²', '44 cm²', '147 cm²', '49 cm²']),
        correct: 'A',
        explanation: 'Area = πr² = (22/7) × 49 = 154 cm²',
      },
      {
        examId: mathExam2.id,
        text: 'What is the perimeter of a square with side 5cm?',
        options: JSON.stringify(['20 cm', '25 cm', '15 cm', '10 cm']),
        correct: 'A',
        explanation: 'Perimeter = 4 × side = 4 × 5 = 20 cm',
      },
      {
        examId: mathExam2.id,
        text: 'What is the sum of angles in a triangle?',
        options: JSON.stringify(['180°', '360°', '90°', '270°']),
        correct: 'A',
        explanation: 'The sum of angles in any triangle is always 180°',
      },
    ],
  });

  // ==================== امتحانات الفيزياء ====================
  const physicsExam1 = await prisma.exam.create({
    data: {
      id: 'physics-exam-1',
      title: 'امتحان الحركة',
      duration: '30 دقيقة',
      subject: 'physics',
      courseId: 'physics',
    },
  });

  const physicsExam2 = await prisma.exam.create({
    data: {
      id: 'physics-exam-2',
      title: 'امتحان القوى',
      duration: '40 دقيقة',
      subject: 'physics',
      courseId: 'physics',
    },
  });

  // أسئلة امتحان الحركة
  await prisma.question.createMany({
    data: [
      {
        examId: physicsExam1.id,
        text: 'What is the formula for velocity?',
        options: JSON.stringify(['v = d/t', 'v = t/d', 'v = d×t', 'v = d+t']),
        correct: 'A',
        explanation: 'Velocity = Distance / Time',
      },
      {
        examId: physicsExam1.id,
        text: 'If a car travels 100m in 20s, what is its speed?',
        options: JSON.stringify(['5 m/s', '20 m/s', '100 m/s', '2 m/s']),
        correct: 'A',
        explanation: 'Speed = Distance / Time = 100m / 20s = 5 m/s',
      },
      {
        examId: physicsExam1.id,
        text: 'What is acceleration?',
        options: JSON.stringify(['Change in velocity/time', 'Distance/time', 'Speed/time', 'Force/mass']),
        correct: 'A',
        explanation: 'Acceleration is the rate of change of velocity with respect to time',
      },
    ],
  });

  // أسئلة امتحان القوى
  await prisma.question.createMany({
    data: [
      {
        examId: physicsExam2.id,
        text: "What is Newton's Second Law?",
        options: JSON.stringify(['F = ma', 'F = mv', 'F = m/a', 'F = a/m']),
        correct: 'A',
        explanation: 'Force = mass × acceleration',
      },
      {
        examId: physicsExam2.id,
        text: 'If mass = 10kg and acceleration = 2m/s², what is the force?',
        options: JSON.stringify(['20 N', '5 N', '12 N', '100 N']),
        correct: 'A',
        explanation: 'F = ma = 10 × 2 = 20 N',
      },
      {
        examId: physicsExam2.id,
        text: 'What is the unit of force?',
        options: JSON.stringify(['Newton', 'Joule', 'Watt', 'Pascal']),
        correct: 'A',
        explanation: 'The SI unit of force is Newton (N)',
      },
    ],
  });

  // ==================== امتحانات الكيمياء ====================
  const chemistryExam1 = await prisma.exam.create({
    data: {
      id: 'chemistry-exam-1',
      title: 'امتحان الهيدروكربونات',
      duration: '30 دقيقة',
      subject: 'chemistry',
      courseId: 'chemistry',
    },
  });

  const chemistryExam2 = await prisma.exam.create({
    data: {
      id: 'chemistry-exam-2',
      title: 'امتحان التفاعلات',
      duration: '40 دقيقة',
      subject: 'chemistry',
      courseId: 'chemistry',
    },
  });

  // أسئلة امتحان الهيدروكربونات
  await prisma.question.createMany({
    data: [
      {
        examId: chemistryExam1.id,
        text: 'What is the molecular formula of methane?',
        options: JSON.stringify(['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀']),
        correct: 'A',
        explanation: 'Methane is the simplest alkane with formula CH₄',
      },
      {
        examId: chemistryExam1.id,
        text: 'What type of bond is in alkanes?',
        options: JSON.stringify(['Single bond', 'Double bond', 'Triple bond', 'Ionic bond']),
        correct: 'A',
        explanation: 'Alkanes contain only single covalent bonds',
      },
      {
        examId: chemistryExam1.id,
        text: 'What is the general formula for alkanes?',
        options: JSON.stringify(['CₙH₂₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙHₙ']),
        correct: 'A',
        explanation: 'Alkanes follow the formula CₙH₂₊₂',
      },
    ],
  });

  // أسئلة امتحان التفاعلات
  await prisma.question.createMany({
    data: [
      {
        examId: chemistryExam2.id,
        text: 'What is a chemical reaction?',
        options: JSON.stringify(['Process that changes substances', 'Physical change', 'Mixing substances', 'Heating substances']),
        correct: 'A',
        explanation: 'A chemical reaction transforms reactants into products',
      },
      {
        examId: chemistryExam2.id,
        text: 'What is the reactant in combustion?',
        options: JSON.stringify(['Oxygen', 'Water', 'Carbon dioxide', 'Nitrogen']),
        correct: 'A',
        explanation: 'Combustion requires oxygen as a reactant',
      },
      {
        examId: chemistryExam2.id,
        text: 'What type of reaction is: A + B → AB?',
        options: JSON.stringify(['Synthesis', 'Decomposition', 'Combustion', 'Replacement']),
        correct: 'A',
        explanation: 'Two substances combining to form one is a synthesis reaction',
      },
    ],
  });

  console.log('✅ Seeding completed successfully!');
  console.log('📚 Created 3 courses with lessons and exams');
  console.log('📝 Created 6 exams with 18 questions total');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });