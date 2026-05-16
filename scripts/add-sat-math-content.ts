import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSATMathContent() {
  console.log('📐 بدء إضافة محتوى SAT Math...\n');

  try {
    // 1. نجيب كورس الرياضيات
    const mathCourse = await prisma.course.findFirst({
      where: { subject: 'Math' },
      include: { lessons: true, exams: true }
    });

    if (!mathCourse) {
      console.log('❌ مش لاقي كورس الرياضيات!');
      return;
    }

    console.log(`✅ وجدت الكورس: ${mathCourse.title}\n`);

    // 2. إضافة دروس حقيقية
    console.log('📚 إضافة الدروس...');
    
    const lessons = [
      {
        title: 'Introduction to Linear Equations',
        description: 'Learn how to solve linear equations in one and two variables. Master the fundamentals of algebra.',
        videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs',
        duration: '45:00',
        order: 1,
        courseId: mathCourse.id
      },
      {
        title: 'Systems of Equations',
        description: 'Solve systems of linear equations using substitution, elimination, and graphing methods.',
        videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations',
        duration: '50:00',
        order: 2,
        courseId: mathCourse.id
      },
      {
        title: 'Quadratic Equations & Functions',
        description: 'Master quadratic equations, factoring, completing the square, and the quadratic formula.',
        videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations',
        duration: '55:00',
        order: 3,
        courseId: mathCourse.id
      },
      {
        title: 'Ratios, Proportions & Percentages',
        description: 'Understand ratios, proportions, and percentage calculations with real-world applications.',
        videoUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-ratios-percents',
        duration: '40:00',
        order: 4,
        courseId: mathCourse.id
      },
      {
        title: 'Geometry: Lines, Angles & Triangles',
        description: 'Learn about geometric relationships, angle properties, and triangle theorems.',
        videoUrl: 'https://www.khanacademy.org/math/geometry/hs-geo-lines',
        duration: '48:00',
        order: 5,
        courseId: mathCourse.id
      },
      {
        title: 'Statistics & Data Analysis',
        description: 'Analyze data using mean, median, mode, range, and standard deviation. Interpret graphs.',
        videoUrl: 'https://www.khanacademy.org/math/statistics-probability',
        duration: '42:00',
        order: 6,
        courseId: mathCourse.id
      },
      {
        title: 'Exponents & Polynomials',
        description: 'Master exponent rules, polynomial operations, and factoring techniques.',
        videoUrl: 'https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:poly-arithmetic',
        duration: '46:00',
        order: 7,
        courseId: mathCourse.id
      },
      {
        title: 'Trigonometry Basics',
        description: 'Introduction to sine, cosine, tangent, and their applications in right triangles.',
        videoUrl: 'https://www.khanacademy.org/math/trigonometry',
        duration: '44:00',
        order: 8,
        courseId: mathCourse.id
      }
    ];

    await prisma.lesson.createMany({ 
      data: lessons,
      skipDuplicates: true 
    });
    console.log(`✅ تم إضافة ${lessons.length} درس بنجاح\n`);

    // 3. إضافة امتحانات إضافية
    console.log('📝 إضافة امتحانات إضافية...');
    
    const additionalExams = [
      {
        title: 'Algebra Fundamentals Test',
        subject: 'Math',
        duration: '45',
        totalQuestions: 10,
        courseId: mathCourse.id
      },
      {
        title: 'Geometry & Trigonometry Test',
        subject: 'Math',
        duration: '45',
        totalQuestions: 10,
        courseId: mathCourse.id
      },
      {
        title: 'Data Analysis & Statistics Test',
        subject: 'Math',
        duration: '40',
        totalQuestions: 8,
        courseId: mathCourse.id
      },
      {
        title: 'Full SAT Math Practice',
        subject: 'Math',
        duration: '80',
        totalQuestions: 58,
        courseId: mathCourse.id
      }
    ];

    const createdExams = await Promise.all(
      additionalExams.map(exam => prisma.exam.create({ data: exam }))
    );
    console.log(`✅ تم إضافة ${createdExams.length} امتحان\n`);

    // 4. إضافة مصادر تعليمية (كتب ومراجع)
    console.log('📚 إضافة المصادر التعليمية...');
    
    const resources = [
      {
        title: 'The Official SAT Study Guide 2023',
        type: 'Book',
        description: 'Official College Board SAT preparation book with 8 full practice tests',
        url: 'https://store.collegeboard.org/product?productId=50321e78-3c93-4339-95ba-b8b2c4e8c0f7&categoryId=20001',
        courseId: mathCourse.id
      },
      {
        title: 'Khan Academy SAT Math',
        type: 'Online Course',
        description: 'Free comprehensive SAT Math course with practice exercises and videos',
        url: 'https://www.khanacademy.org/sat',
        courseId: mathCourse.id
      },
      {
        title: 'SAT Math Prep Plus 2024',
        type: 'Book',
        description: '5 practice tests + proven strategies + online practice',
        url: 'https://www.kaptest.com/study/sat/',
        courseId: mathCourse.id
      },
      {
        title: 'College Board SAT Practice',
        type: 'Practice Tests',
        description: 'Free official SAT practice tests and questions',
        url: 'https://satsuite.collegeboard.org/sat/practice',
        courseId: mathCourse.id
      }
    ];

    // ملاحظة: لو عايز تضيف جدول Resources، هتحتاج تضيفه في schema.prisma الأول
    console.log('📖 المصادر المقترحة:');
    resources.forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.title} - ${r.type}`);
    });
    console.log('');

    // 5. إضافة نصائح واستراتيجيات
    console.log('💡 إضافة نصائح SAT Math...');
    
    const tips = [
      '⏱️ خصص حوالي دقيقة و15 ثانية لكل سؤال',
      '📝 ابدأ بالأسئلة السهلة وارجع للصعبة',
      '✏️ استخدم الآلة الحاسبة بذكاء (MATH button مفيدة)',
      '🎯 اقرأ السؤال كويس قبل ما تبدأ تحل',
      '✅ اختبر إجابتك بالتعويض لو فيه وقت',
      '📊 اعرف صيغ الهندسة الأساسية (معطاة في الاختبار)',
      '🔄 تدرب على الأسئلة القديمة كتير'
    ];

    console.log('\n📋 نصائح مهمة لـ SAT Math:');
    tips.forEach((tip, i) => console.log(`   ${i + 1}. ${tip}`));

    console.log('\n🎉 تم إضافة محتوى SAT Math بنجاح!');
    console.log('\n📊 الملخص:');
    console.log(`   📚 ${lessons.length} درس`);
    console.log(`   📝 ${createdExams.length} امتحان إضافي`);
    console.log(`   📖 ${resources.length} مصدر تعليمي`);
    console.log(`   💡 ${tips.length} نصيحة استراتيجية`);

  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

addSATMathContent();