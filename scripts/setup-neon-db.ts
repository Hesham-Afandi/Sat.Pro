import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log('🚀 بدء إعداد قاعدة البيانات من الصفر...\n');

  try {
    // 1️⃣ تنظيف البيانات القديمة (ترتيب عكسي للعلاقات لتجنب الأخطاء)
    console.log(' تنظيف الجداول القديمة...');
    await prisma.question.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.course.deleteMany();
    console.log('✅ تم التنظيف بنجاح\n');

    // 2️⃣ إنشاء الكورسات الأساسية
    console.log('📚 إنشاء الكورسات...');
    const mathCourse = await prisma.course.create({
      data: { title: 'SAT Mathematics', subject: 'Math', level: 'comprehensive', isPublished: true, description: 'كورس شامل لرياضيات الـ SAT يغطي الجبر، الهندسة، والإحصاء' }
    });
    const physicsCourse = await prisma.course.create({
      data: { title: 'SAT Physics', subject: 'Physics', level: 'comprehensive', isPublished: true, description: 'كورس شامل لفيزياء الـ SAT يغطي الميكانيكا، الكهرباء، والموجات' }
    });
    const chemistryCourse = await prisma.course.create({
      data: { title: 'SAT Chemistry', subject: 'Chemistry', level: 'comprehensive', isPublished: true, description: 'كورس شامل لكيمياء الـ SAT يغطي الذرة، الروابط، والتفاعلات' }
    });
    const englishCourse = await prisma.course.create({
      data: { title: 'SAT Reading & Writing', subject: 'English', level: 'comprehensive', isPublished: true, description: 'كورس شامل للقراءة، الكتابة، والقواعد' }
    });
    console.log('✅ تم إنشاء 4 كورسات\n');

    // 3️⃣ إنشاء الامتحانات وربطها بالكورسات
    console.log('📝 إنشاء الامتحانات...');
    const exams = await Promise.all([
      prisma.exam.create({
        data: { title: 'Math Practice Test', subject: 'Math', duration: '60', totalQuestions: 6, courseId: mathCourse.id }
      }),
      prisma.exam.create({
        data: { title: 'Physics Practice Test', subject: 'Physics', duration: '60', totalQuestions: 6, courseId: physicsCourse.id }
      }),
      prisma.exam.create({
        data: { title: 'Chemistry Practice Test', subject: 'Chemistry', duration: '60', totalQuestions: 6, courseId: chemistryCourse.id }
      }),
      prisma.exam.create({
        data: { title: 'Reading Practice Test', subject: 'English', duration: '45', totalQuestions: 6, courseId: englishCourse.id }
      })
    ]);
    console.log('✅ تم إنشاء 4 امتحانات مربوطة بالكورسات\n');

    // 4️⃣ دالة مساعدة لإضافة الأسئلة
    const addQuestions = async (examId: string, questions: any[]) => {
      await prisma.question.createMany({
        data: questions.map(q => ({ ...q, examId }))
      });
    };

    // 📐 أسئلة الرياضيات
    console.log('➗ إضافة أسئلة الرياضيات...');
    await addQuestions(exams[0].id, [
      { text: "If 3x + 7 = 22, what is the value of 2x - 5?", options: JSON.stringify(["5", "7", "9", "3"]), correct: "5", explanation: "3x = 15 → x = 5 → 2(5) - 5 = 5" },
      { text: "What is the area of a rectangle with length 12 and width 8?", options: JSON.stringify(["20", "40", "96", "48"]), correct: "96", explanation: "Area = length × width = 12 × 8 = 96" },
      { text: "If f(x) = 2x² - 3x + 1, what is f(3)?", options: JSON.stringify(["10", "16", "19", "28"]), correct: "10", explanation: "f(3) = 2(9) - 9 + 1 = 10" },
      { text: "The mean of 5 numbers is 20. If one number is removed, the mean becomes 18. What was the removed number?", options: JSON.stringify(["28", "30", "32", "26"]), correct: "28", explanation: "Total of 5 = 100, Total of 4 = 72, Removed = 28" },
      { text: "In a right triangle, if sin θ = 3/5, what is cos θ?", options: JSON.stringify(["3/5", "4/5", "5/4", "5/3"]), correct: "4/5", explanation: "sin²θ + cos²θ = 1 → (3/5)² + cos²θ = 1 → cos θ = 4/5" },
      { text: "What are the solutions to x² - 5x + 6 = 0?", options: JSON.stringify(["x=2 and x=3", "x=-2 and x=-3", "x=1 and x=6", "x=-1 and x=-6"]), correct: "x=2 and x=3", explanation: "Factor: (x-2)(x-3)=0 → x=2 or x=3" }
    ]);

    // ⚛️ أسئلة الفيزياء
    console.log(' إضافة أسئلة الفيزياء...');
    await addQuestions(exams[1].id, [
      { text: "A car travels 120 km in 2 hours. What is its average speed?", options: JSON.stringify(["40 km/h", "50 km/h", "60 km/h", "80 km/h"]), correct: "60 km/h", explanation: "Speed = Distance / Time = 120 / 2 = 60 km/h" },
      { text: "If F=20N and m=5kg, what is the acceleration?", options: JSON.stringify(["2 m/s²", "4 m/s²", "10 m/s²", "25 m/s²"]), correct: "4 m/s²", explanation: "F=ma → a=F/m = 20/5 = 4 m/s²" },
      { text: "What is the kinetic energy of a 2kg object moving at 3 m/s?", options: JSON.stringify(["3 J", "6 J", "9 J", "18 J"]), correct: "9 J", explanation: "KE = ½mv² = ½(2)(3)² = 9 J" },
      { text: "If V=12V and R=4Ω, what is the current?", options: JSON.stringify(["2 A", "3 A", "6 A", "48 A"]), correct: "3 A", explanation: "Ohm's Law: I = V/R = 12/4 = 3 A" },
      { text: "A wave has frequency 50 Hz and wavelength 2 m. What is its speed?", options: JSON.stringify(["25 m/s", "50 m/s", "100 m/s", "200 m/s"]), correct: "100 m/s", explanation: "v = fλ = 50 × 2 = 100 m/s" },
      { text: "An object is dropped from rest. After 3 seconds, what is its velocity? (g=10 m/s²)", options: JSON.stringify(["10 m/s", "20 m/s", "30 m/s", "40 m/s"]), correct: "30 m/s", explanation: "v = gt = 10 × 3 = 30 m/s" }
    ]);

    // 🧪 أسئلة الكيمياء
    console.log(' إضافة أسئلة الكيمياء...');
    await addQuestions(exams[2].id, [
      { text: "How many protons does a carbon atom have?", options: JSON.stringify(["4", "6", "8", "12"]), correct: "6", explanation: "Carbon atomic number is 6" },
      { text: "What type of bond is formed in NaCl?", options: JSON.stringify(["Covalent", "Ionic", "Metallic", "Hydrogen"]), correct: "Ionic", explanation: "Na transfers electron to Cl, forming ions" },
      { text: "How many moles in 44g of CO₂? (Molar mass = 44 g/mol)", options: JSON.stringify(["0.5 mol", "1 mol", "2 mol", "44 mol"]), correct: "1 mol", explanation: "Moles = mass / molar mass = 44/44 = 1" },
      { text: "A solution with pH = 3 is:", options: JSON.stringify(["Strongly acidic", "Weakly acidic", "Neutral", "Basic"]), correct: "Strongly acidic", explanation: "pH < 7 is acidic, 1-3 is strongly acidic" },
      { text: "According to Boyle's Law, if pressure doubles, what happens to volume?", options: JSON.stringify(["Doubles", "Halved", "Same", "Quadruples"]), correct: "Halved", explanation: "P₁V₁ = P₂V₂ → V₂ = V₁/2" },
      { text: "Which element is in Group 18 and Period 2?", options: JSON.stringify(["Helium", "Neon", "Argon", "Krypton"]), correct: "Neon", explanation: "Neon is in Group 18, Period 2" }
    ]);

    // 📖 أسئلة الإنجليزي
    console.log('📝 إضافة أسئلة الإنجليزي...');
    await addQuestions(exams[3].id, [
      { text: "Read: 'The Industrial Revolution marked a major turning point.' What is the main idea?", options: JSON.stringify(["It was unimportant", "It greatly changed daily life", "Daily life remained the same", "Only some aspects were affected"]), correct: "It greatly changed daily life", explanation: "Passage says it was a 'major turning point' affecting 'almost every aspect'" },
      { text: "Choose the correct sentence:", options: JSON.stringify(["She don't like apples", "She doesn't likes apples", "She doesn't like apples", "She not like apples"]), correct: "She doesn't like apples", explanation: "Third person singular requires 'doesn't' + base verb" },
      { text: "What does 'meticulous' mean?", options: JSON.stringify(["Careless and hasty", "Showing great attention to detail", "Confused and uncertain", "Angry and aggressive"]), correct: "Showing great attention to detail", explanation: "Meticulous means very careful and precise" },
      { text: "Despite the heavy rain, the team ______ to complete the project on time.", options: JSON.stringify(["managed", "manages", "managing", "manage"]), correct: "managed", explanation: "Past tense context requires 'managed'" },
      { text: "Which sentence is grammatically correct?", options: JSON.stringify(["The students was studying", "The students were studying", "The students is studying", "The students studying"]), correct: "The students were studying", explanation: "Plural subject 'students' requires plural verb 'were'" },
      { text: "In 'The arid desert climate made it difficult to grow crops', what does 'arid' mean?", options: JSON.stringify(["Wet and humid", "Extremely dry", "Cold and snowy", "Fertile and rich"]), correct: "Extremely dry", explanation: "Context clues 'desert' and 'difficult to grow' indicate dryness" }
    ]);

    console.log('✅ تم إضافة 24 سؤال حقيقي (6 لكل مادة)\n');

    // 5️⃣ إضافة دروس تجريبية (اختياري)
    console.log('📖 إضافة الدروس...');
    const lessonsData = [];
    const courseIds = [mathCourse.id, physicsCourse.id, chemistryCourse.id, englishCourse.id];
    const courseNames = ['Math', 'Physics', 'Chemistry', 'English'];

    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 3; j++) {
        lessonsData.push({
          title: `${courseNames[i]} Lesson ${j}`,
          description: `درس ${j} في مادة ${courseNames[i]}`,
          videoUrl: `https://example.com/${courseNames[i].toLowerCase()}-lesson-${j}`,
          duration: `${j * 15}:00`,
          order: j,
          courseId: courseIds[i]
        });
      }
    }
    await prisma.lesson.createMany({ data: lessonsData });
    console.log('✅ تم إضافة 12 درس\n');

    // 🎉 النتيجة النهائية
    console.log('🎉 تم إعداد قاعدة البيانات بنجاح!');
    console.log('📊 الإحصائيات النهائية:');
    console.log('   📘 الكورسات: 4 (Math, Physics, Chemistry, English)');
    console.log('   📝 الامتحانات: 4 (كل مادة ليها امتحان)');
    console.log('   ❓ الأسئلة: 24 سؤال حقيقي مع الشرح');
    console.log('   🎥 الدروس: 12 درس');

  } catch (error: any) {
    console.error('❌ فشل الإعداد:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();