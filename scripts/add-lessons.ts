import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("📚 Adding lessons to courses...");

  // دروس الرياضيات
  const mathCourse = await prisma.course.findUnique({
    where: { subject: "math" },
  });

  if (mathCourse) {
    const mathLessons = [
      {
        title: "مقدمة في الجبر",
        description: "شرح أساسيات الجبر والمعادلات",
        order: 1,
        courseId: mathCourse.id,
        videoUrl: null,
      },
      {
        title: "المعادلات الخطية",
        description: "حل المعادلات الخطية بمتغير واحد",
        order: 2,
        courseId: mathCourse.id,
        videoUrl: null,
      },
      {
        title: "الهندسة التحليلية",
        description: "الإحداثيات والنقاط على المستوى",
        order: 3,
        courseId: mathCourse.id,
        videoUrl: null,
      },
      {
        title: "الدوال الرياضية",
        description: "مفهوم الدوال وأنواعها",
        order: 4,
        courseId: mathCourse.id,
        videoUrl: null,
      },
      {
        title: "الإحصاء والاحتمالات",
        description: "أساسيات الإحصاء وحساب الاحتمالات",
        order: 5,
        courseId: mathCourse.id,
        videoUrl: null,
      },
    ];

    // نتحقق من كل درس قبل الإضافة
    for (const lesson of mathLessons) {
      const exists = await prisma.lesson.findFirst({
        where: {
          courseId: mathCourse.id,
          title: lesson.title,
        },
      });

      if (!exists) {
        await prisma.lesson.create({ data: lesson });
      }
    }
    console.log("✅ Math lessons added");
  }

  // دروس الفيزياء
  const physicsCourse = await prisma.course.findUnique({
    where: { subject: "physics" },
  });

  if (physicsCourse) {
    const physicsLessons = [
      {
        title: "الميكانيكا - الحركة",
        description: "شرح أنواع الحركة والسرعة",
        order: 1,
        courseId: physicsCourse.id,
        videoUrl: null,
      },
      {
        title: "قوانين نيوتن",
        description: "القوانين الثلاثة للحركة",
        order: 2,
        courseId: physicsCourse.id,
        videoUrl: null,
      },
      {
        title: "الطاقة والشغل",
        description: "مفهوم الطاقة وأنواعها",
        order: 3,
        courseId: physicsCourse.id,
        videoUrl: null,
      },
      {
        title: "الكهرباء",
        description: "الدوائر الكهربائية والتيار",
        order: 4,
        courseId: physicsCourse.id,
        videoUrl: null,
      },
      {
        title: "الضوء والبصريات",
        description: "خصائص الضوء والانعكاس",
        order: 5,
        courseId: physicsCourse.id,
        videoUrl: null,
      },
    ];

    for (const lesson of physicsLessons) {
      const exists = await prisma.lesson.findFirst({
        where: {
          courseId: physicsCourse.id,
          title: lesson.title,
        },
      });

      if (!exists) {
        await prisma.lesson.create({ data: lesson });
      }
    }
    console.log("✅ Physics lessons added");
  }

  // دروس الكيمياء
  const chemistryCourse = await prisma.course.findUnique({
    where: { subject: "chemistry" },
  });

  if (chemistryCourse) {
    const chemistryLessons = [
      {
        title: "الذرة والجدول الدوري",
        description: "تركيب الذرة والعناصر",
        order: 1,
        courseId: chemistryCourse.id,
        videoUrl: null,
      },
      {
        title: "الروابط الكيميائية",
        description: "أنواع الروابط بين الذرات",
        order: 2,
        courseId: chemistryCourse.id,
        videoUrl: null,
      },
      {
        title: "التفاعلات الكيميائية",
        description: "أنواع التفاعلات ومعادلاتها",
        order: 3,
        courseId: chemistryCourse.id,
        videoUrl: null,
      },
      {
        title: "الأحماض والقواعد",
        description: "خصائص الأحماض والقواعد",
        order: 4,
        courseId: chemistryCourse.id,
        videoUrl: null,
      },
      {
        title: "الكيمياء العضوية",
        description: "مقدمة في المركبات العضوية",
        order: 5,
        courseId: chemistryCourse.id,
        videoUrl: null,
      },
    ];

    for (const lesson of chemistryLessons) {
      const exists = await prisma.lesson.findFirst({
        where: {
          courseId: chemistryCourse.id,
          title: lesson.title,
        },
      });

      if (!exists) {
        await prisma.lesson.create({ data: lesson });
      }
    }
    console.log("✅ Chemistry lessons added");
  }

  console.log("🎉 All lessons added successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });