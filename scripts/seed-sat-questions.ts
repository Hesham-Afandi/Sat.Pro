// 📁 الملف: scripts/seed-sat-questions.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSATQuestions() {
  console.log('🚀 بدء إضافة أسئلة SAT...\n');

  try {
    // 1. نجيب الامتحانات الموجودة عشان نربط الأسئلة بيها
    const mathExam = await prisma.exam.findFirst({ where: { subject: 'Math' } });
    const physicsExam = await prisma.exam.findFirst({ where: { subject: 'Physics' } });
    const chemistryExam = await prisma.exam.findFirst({ where: { subject: 'Chemistry' } });
    const englishExam = await prisma.exam.findFirst({ where: { subject: 'English' } });

    if (!mathExam || !physicsExam || !chemistryExam || !englishExam) {
      console.log('❌ تأكد إن فيه امتحانات موجودة في الداتابيز أولاً!');
      return;
    }

    // 2. أسئلة الرياضيات
    console.log('📐 إضافة أسئلة الرياضيات...');
    await prisma.question.createMany({
      data: [
        {
          text: "If 3x + 7 = 22, what is the value of 2x - 5?",
          options: JSON.stringify(["5", "7", "9", "3"]),
          correct: "5",
          explanation: "First solve for x: 3x + 7 = 22 → 3x = 15 → x = 5. Then: 2(5) - 5 = 5",
          examId: mathExam.id,
        },
        {
          text: "A rectangle has length 12 cm and width 8 cm. What is its area?",
          options: JSON.stringify(["20 cm²", "40 cm²", "96 cm²", "48 cm²"]),
          correct: "96 cm²",
          explanation: "Area = length × width = 12 × 8 = 96 cm²",
          examId: mathExam.id,
        },
        {
          text: "If f(x) = 2x² - 3x + 1, what is f(3)?",
          options: JSON.stringify(["10", "16", "19", "28"]),
          correct: "10",
          explanation: "f(3) = 2(9) - 9 + 1 = 18 - 9 + 1 = 10",
          examId: mathExam.id,
        },
        {
          text: "The mean of 5 numbers is 20. If one number is removed, the mean becomes 18. What was the removed number?",
          options: JSON.stringify(["28", "30", "32", "26"]),
          correct: "28",
          explanation: "Total of 5 = 100, Total of 4 = 72, Removed = 100 - 72 = 28",
          examId: mathExam.id,
        },
        {
          text: "In a right triangle, if sin θ = 3/5, what is cos θ?",
          options: JSON.stringify(["3/5", "4/5", "5/4", "5/3"]),
          correct: "4/5",
          explanation: "sin²θ + cos²θ = 1 → (3/5)² + cos²θ = 1 → cos²θ = 16/25 → cos θ = 4/5",
          examId: mathExam.id,
        },
        {
          text: "What are the solutions to x² - 5x + 6 = 0?",
          options: JSON.stringify(["x=2 and x=3", "x=-2 and x=-3", "x=1 and x=6", "x=-1 and x=-6"]),
          correct: "x=2 and x=3",
          explanation: "Factor: (x-2)(x-3)=0 → x=2 or x=3",
          examId: mathExam.id,
        },
      ],
    });

    // 3. أسئلة الفيزياء
    console.log('⚛️ إضافة أسئلة الفيزياء...');
    await prisma.question.createMany({
      data: [
        {
          text: "A car travels 120 km in 2 hours. What is its average speed?",
          options: JSON.stringify(["40 km/h", "50 km/h", "60 km/h", "80 km/h"]),
          correct: "60 km/h",
          explanation: "Speed = Distance / Time = 120 / 2 = 60 km/h",
          examId: physicsExam.id,
        },
        {
          text: "According to Newton's Second Law, if F=20N and m=5kg, what is acceleration?",
          options: JSON.stringify(["2 m/s²", "4 m/s²", "10 m/s²", "25 m/s²"]),
          correct: "4 m/s²",
          explanation: "F=ma → a=F/m = 20/5 = 4 m/s²",
          examId: physicsExam.id,
        },
        {
          text: "What is the kinetic energy of a 2kg object moving at 3 m/s?",
          options: JSON.stringify(["3 J", "6 J", "9 J", "18 J"]),
          correct: "9 J",
          explanation: "KE = ½mv² = ½(2)(3)² = 9 J",
          examId: physicsExam.id,
        },
        {
          text: "If V=12V and R=4Ω, what is the current?",
          options: JSON.stringify(["2 A", "3 A", "6 A", "48 A"]),
          correct: "3 A",
          explanation: "Ohm's Law: I = V/R = 12/4 = 3 A",
          examId: physicsExam.id,
        },
        {
          text: "A wave has frequency 50 Hz and wavelength 2 m. What is its speed?",
          options: JSON.stringify(["25 m/s", "50 m/s", "100 m/s", "200 m/s"]),
          correct: "100 m/s",
          explanation: "Speed = frequency × wavelength = 50 × 2 = 100 m/s",
          examId: physicsExam.id,
        },
        {
          text: "An object is dropped from rest. After 3 seconds, what is its velocity? (g=10 m/s²)",
          options: JSON.stringify(["10 m/s", "20 m/s", "30 m/s", "40 m/s"]),
          correct: "30 m/s",
          explanation: "v = gt = 10 × 3 = 30 m/s",
          examId: physicsExam.id,
        },
      ],
    });

    // 4. أسئلة الكيمياء
    console.log('🧪 إضافة أسئلة الكيمياء...');
    await prisma.question.createMany({
      data: [
        {
          text: "How many protons does a carbon atom have?",
          options: JSON.stringify(["4", "6", "8", "12"]),
          correct: "6",
          explanation: "Carbon has atomic number 6, which means 6 protons",
          examId: chemistryExam.id,
        },
        {
          text: "What type of bond is formed in NaCl?",
          options: JSON.stringify(["Covalent", "Ionic", "Metallic", "Hydrogen"]),
          correct: "Ionic",
          explanation: "NaCl forms ionic bond through electron transfer",
          examId: chemistryExam.id,
        },
        {
          text: "How many moles in 44g of CO₂? (Molar mass = 44 g/mol)",
          options: JSON.stringify(["0.5 mol", "1 mol", "2 mol", "44 mol"]),
          correct: "1 mol",
          explanation: "Moles = mass / molar mass = 44 / 44 = 1 mol",
          examId: chemistryExam.id,
        },
        {
          text: "A solution with pH = 3 is:",
          options: JSON.stringify(["Strongly acidic", "Weakly acidic", "Neutral", "Basic"]),
          correct: "Strongly acidic",
          explanation: "pH < 7 is acidic, and pH 1-3 is strongly acidic",
          examId: chemistryExam.id,
        },
        {
          text: "According to Boyle's Law, if pressure doubles, what happens to volume?",
          options: JSON.stringify(["Doubles", "Halved", "Same", "Quadruples"]),
          correct: "Halved",
          explanation: "P₁V₁ = P₂V₂, if P₂ = 2P₁, then V₂ = V₁/2",
          examId: chemistryExam.id,
        },
        {
          text: "Which element is in Group 18 and Period 2?",
          options: JSON.stringify(["Helium", "Neon", "Argon", "Krypton"]),
          correct: "Neon",
          explanation: "Neon is in Group 18 (Noble Gases) and Period 2",
          examId: chemistryExam.id,
        },
      ],
    });

    // 5. أسئلة الإنجليزي
    console.log('📖 إضافة أسئلة الإنجليزي...');
    await prisma.question.createMany({
      data: [
        {
          text: "Read: 'The Industrial Revolution marked a major turning point in history.' What is the main idea?",
          options: JSON.stringify([
            "It was unimportant",
            "It greatly changed daily life",
            "Daily life remained the same",
            "Only some aspects were affected"
          ]),
          correct: "It greatly changed daily life",
          explanation: "The passage says it was a 'major turning point' affecting 'almost every aspect'",
          examId: englishExam.id,
        },
        {
          text: "Choose the correct sentence:",
          options: JSON.stringify([
            "She don't like apples",
            "She doesn't likes apples",
            "She doesn't like apples",
            "She not like apples"
          ]),
          correct: "She doesn't like apples",
          explanation: "Third person singular requires 'doesn't' + base verb",
          examId: englishExam.id,
        },
        {
          text: "What does 'meticulous' mean?",
          options: JSON.stringify([
            "Careless and hasty",
            "Showing great attention to detail",
            "Confused and uncertain",
            "Angry and aggressive"
          ]),
          correct: "Showing great attention to detail",
          explanation: "Meticulous means very careful and precise",
          examId: englishExam.id,
        },
        {
          text: "Despite the heavy rain, the team ______ to complete the project on time.",
          options: JSON.stringify(["managed", "manages", "managing", "manage"]),
          correct: "managed",
          explanation: "Past tense context requires past tense verb 'managed'",
          examId: englishExam.id,
        },
        {
          text: "Which sentence is grammatically correct?",
          options: JSON.stringify([
            "The students was studying",
            "The students were studying",
            "The students is studying",
            "The students studying"
          ]),
          correct: "The students were studying",
          explanation: "'Students' is plural, requires plural verb 'were'",
          examId: englishExam.id,
        },
        {
          text: "In 'The arid desert climate made it difficult to grow crops', what does 'arid' mean?",
          options: JSON.stringify([
            "Wet and humid",
            "Extremely dry",
            "Cold and snowy",
            "Fertile and rich"
          ]),
          correct: "Extremely dry",
          explanation: "Context clue 'desert' and 'difficult to grow' indicates dryness",
          examId: englishExam.id,
        },
      ],
    });

    console.log('\n✅ تم إضافة 24 سؤال بنجاح! (6 لكل مادة)');
    
  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedSATQuestions();