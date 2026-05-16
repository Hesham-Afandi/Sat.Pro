import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// محتوى حقيقي للدروس
const mathLessonsContent = [
  {
    order: 1,
    title: 'Introduction to Linear Equations',
    description: 'Learn how to solve linear equations in one and two variables. Master the fundamentals of algebra.',
    videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:two-step-equations-intro/v/solving-equations-with-the-distributive-property',
    duration: '15:00',
    content: 'في هذا الدرس سنتعلم كيفية حل المعادلات الخطية بخطوتين. سنبدأ بأمثلة بسيطة ثم نتدرج للمستويات الأصعب.',
  },
  {
    order: 2,
    title: 'Systems of Equations',
    description: 'Solve systems of linear equations using substitution, elimination, and graphing methods.',
    videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations',
    duration: '45:00',
    content: 'سنتعلم ثلاث طرق لحل أنظمة المعادلات: التعويض، الحذف، والرسم البياني.',
  },
  {
    order: 3,
    title: 'Quadratic Equations',
    description: 'Master quadratic equations, factoring, completing the square, and the quadratic formula.',
    videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations',
    duration: '45:00',
    content: 'المعادلات التربيعية وكيفية حلها باستخدام التحليل، إكمال المربع، والقانون العام.',
  },
  {
    order: 4,
    title: 'Functions and Graphs',
    description: 'Understand function notation, domain, range, and how to graph various functions.',
    videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions',
    duration: '40:00',
    content: 'شرح شامل للدوال والرسوم البيانية، بما في ذلك المجال والمدى.',
  },
  {
    order: 5,
    title: 'Polynomials and Factoring',
    description: 'Learn polynomial operations, factoring techniques, and applications.',
    videoUrl: 'https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:poly-arithmetic',
    duration: '50:00',
    content: 'العمليات على كثيرات الحدود وتقنيات التحليل المختلفة.',
  },
  {
    order: 6,
    title: 'Exponents and Radicals',
    description: 'Master exponent rules, radical expressions, and rational exponents.',
    videoUrl: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:exponents-radicals',
    duration: '35:00',
    content: 'قوانين الأسس والجذور وكيفية التعامل مع الأسس الكسرية.',
  },
  {
    order: 7,
    title: 'Ratios and Proportions',
    description: 'Understand ratios, proportions, and their applications in real-world problems.',
    videoUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-ratios-percents',
    duration: '30:00',
    content: 'النسب والتناسب وكيفية استخدامها في حل المسائل العملية.',
  },
  {
    order: 8,
    title: 'Percentages',
    description: 'Learn percentage calculations, increase/decrease, and applications.',
    videoUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-ratios-percents',
    duration: '25:00',
    content: 'حساب النسب المئوية والزيادة والنقصان المئوي.',
  },
  {
    order: 9,
    title: 'Geometry Basics',
    description: 'Lines, angles, triangles, and their properties.',
    videoUrl: 'https://www.khanacademy.org/math/geometry/hs-geo-lines',
    duration: '40:00',
    content: 'أساسيات الهندسة: الخطوط، الزوايا، والمثلثات.',
  },
  {
    order: 10,
    title: 'Area and Perimeter',
    description: 'Calculate area and perimeter of various shapes.',
    videoUrl: 'https://www.khanacademy.org/math/geometry-home/geometry-area-perimeter',
    duration: '35:00',
    content: 'حساب المساحة والمحيط للأشكال الهندسية المختلفة.',
  },
  {
    order: 11,
    title: 'Volume and Surface Area',
    description: '3D shapes, volume, and surface area calculations.',
    videoUrl: 'https://www.khanacademy.org/math/geometry-home/geometry-volume-surface-area',
    duration: '40:00',
    content: 'حساب الحجم والمساحة السطحية للأجسام ثلاثية الأبعاد.',
  },
  {
    order: 12,
    title: 'Statistics and Data',
    description: 'Mean, median, mode, range, and data interpretation.',
    videoUrl: 'https://www.khanacademy.org/math/statistics-probability',
    duration: '35:00',
    content: 'الإحصاء: الوسط الحسابي، الوسيط، المنوال، والمدى.',
  },
  {
    order: 13,
    title: 'Probability',
    description: 'Basic probability concepts and calculations.',
    videoUrl: 'https://www.khanacademy.org/math/statistics-probability/probability-library',
    duration: '30:00',
    content: 'مفاهيم الاحتمالات الأساسية وكيفية حسابها.',
  },
  {
    order: 14,
    title: 'Trigonometry Basics',
    description: 'Introduction to sine, cosine, tangent, and their applications.',
    videoUrl: 'https://www.khanacademy.org/math/trigonometry',
    duration: '45:00',
    content: 'مقدمة في المثلثات: الجيب، جيب التمام، والمماس.',
  },
  {
    order: 15,
    title: 'Circle Geometry',
    description: 'Properties of circles, arcs, sectors, and angles.',
    videoUrl: 'https://www.khanacademy.org/math/geometry-home/cc-geometry-circles',
    duration: '40:00',
    content: 'خصائص الدوائر والأقواس والقطاعات والزوايا.',
  },
  // ... يمكنك إضافة باقي الـ 27 درس هنا
];

async function updateLessonsContent() {
  console.log('🔄 بدء تحديث محتوى الدروس...\n');

  try {
    // نجيب كورس الرياضيات
    const mathCourse = await prisma.course.findFirst({
      where: { subject: 'Math' },
      include: { lessons: true }
    });

    if (!mathCourse) {
      console.log('❌ مش لاقي كورس الرياضيات!');
      return;
    }

    console.log(`📚 وجدت ${mathCourse.lessons.length} درس في كورس الرياضيات\n`);

    // نحدث كل درس بالمحتوى الحقيقي
    let updatedCount = 0;
    for (const lessonData of mathLessonsContent) {
      const lesson = mathCourse.lessons.find(l => l.order === lessonData.order);
      
      if (lesson) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            title: lessonData.title,
            description: lessonData.description,
            videoUrl: lessonData.videoUrl,
            duration: lessonData.duration,
            // يمكنك إضافة حقل content لو موجود في الـ schema
          }
        });
        updatedCount++;
        console.log(`✅ تم تحديث الدرس ${lessonData.order}: ${lessonData.title}`);
      }
    }

    console.log(`\n🎉 تم تحديث ${updatedCount} درس بنجاح!`);

  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateLessonsContent();