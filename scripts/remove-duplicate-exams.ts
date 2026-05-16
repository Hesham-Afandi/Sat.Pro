import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function removeDuplicateExams() {
  console.log('🗑️ بدء مسح التكرارات...\n');

  try {
    const exams = await prisma.exam.findMany({
      include: { questions: true }
    });

    // نقسم الامتحانات حسب العنوان والمادة
    const examGroups = new Map<string, any[]>();

    exams.forEach(exam => {
      const key = `${exam.title}-${exam.subject}`;
      if (!examGroups.has(key)) {
        examGroups.set(key, []);
      }
      examGroups.get(key)!.push(exam);
    });

    let deletedCount = 0;

    // نمسح التكرارات ونخلي بس واحدة
    for (const [key, group] of examGroups) {
      if (group.length > 1) {
        console.log(`📋 ${group[0].title}: وجدت ${group.length} نسخ`);

        // نرتبهم عشان نخلي اللي فيه أسئلة أكتر
        group.sort((a, b) => b.questions.length - a.questions.length);

        // نمسح كل النسخ except الأولى
        for (let i = 1; i < group.length; i++) {
          await prisma.exam.delete({ where: { id: group[i].id } });
          deletedCount++;
          console.log(`   ❌ Deleted: ${group[i].id}`);
        }

        console.log(`   ✅ Kept: ${group[0].id} (${group[0].questions.length} questions)\n`);
      }
    }

    console.log(`\n🎉 تم مسح ${deletedCount} امتحان مكرر!`);
    console.log('✅ الداتابيز نظفت من التكرارات!');

  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicateExams();