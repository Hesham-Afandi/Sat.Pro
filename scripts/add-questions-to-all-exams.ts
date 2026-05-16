import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// أسئلة الرياضيات - الجبر
const algebraQuestions = [
  {
    text: "If 2x + 5 = 17, what is the value of x?",
    options: JSON.stringify(["5", "6", "7", "8"]),
    correct: "6",
    explanation: "2x = 17 - 5 = 12, so x = 12/2 = 6"
  },
  {
    text: "What is the solution to 3(x - 4) = 2x + 1?",
    options: JSON.stringify(["11", "13", "15", "17"]),
    correct: "13",
    explanation: "3x - 12 = 2x + 1, so x = 13"
  },
  {
    text: "If f(x) = 2x + 3, what is f(5)?",
    options: JSON.stringify(["10", "11", "13", "15"]),
    correct: "13",
    explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13"
  },
  {
    text: "Simplify: (3x²)(2x³)",
    options: JSON.stringify(["5x⁵", "6x⁵", "6x⁶", "5x⁶"]),
    correct: "6x⁵",
    explanation: "Multiply coefficients (3×2=6) and add exponents (2+3=5)"
  },
  {
    text: "What is the slope of the line y = 3x - 7?",
    options: JSON.stringify(["-7", "3", "7", "-3"]),
    correct: "3",
    explanation: "In y = mx + b form, m (slope) = 3"
  },
  {
    text: "If x/4 = 5/2, what is x?",
    options: JSON.stringify(["8", "10", "12", "15"]),
    correct: "10",
    explanation: "Cross multiply: 2x = 20, so x = 10"
  }
];

// أسئلة الهندسة والمثلثات
const geometryQuestions = [
  {
    text: "What is the area of a triangle with base 8 cm and height 6 cm?",
    options: JSON.stringify(["24 cm²", "28 cm²", "48 cm²", "14 cm²"]),
    correct: "24 cm²",
    explanation: "Area = ½ × base × height = ½ × 8 × 6 = 24 cm²"
  },
  {
    text: "In a right triangle, if one angle is 90° and another is 30°, what is the third angle?",
    options: JSON.stringify(["30°", "45°", "60°", "90°"]),
    correct: "60°",
    explanation: "Sum of angles in triangle = 180°, so 180 - 90 - 30 = 60°"
  },
  {
    text: "What is the circumference of a circle with radius 5 cm? (Use π = 3.14)",
    options: JSON.stringify(["15.7 cm", "31.4 cm", "78.5 cm", "25 cm"]),
    correct: "31.4 cm",
    explanation: "Circumference = 2πr = 2 × 3.14 × 5 = 31.4 cm"
  },
  {
    text: "If sin θ = 3/5, what is cos θ in a right triangle?",
    options: JSON.stringify(["3/5", "4/5", "5/4", "5/3"]),
    correct: "4/5",
    explanation: "Using Pythagorean identity: sin²θ + cos²θ = 1"
  },
  {
    text: "What is the volume of a cylinder with radius 3 cm and height 10 cm?",
    options: JSON.stringify(["90π cm³", "30π cm³", "60π cm³", "120π cm³"]),
    correct: "90π cm³",
    explanation: "Volume = πr²h = π × 9 × 10 = 90π cm³"
  },
  {
    text: "Two angles are supplementary. If one angle is 125°, what is the other?",
    options: JSON.stringify(["45°", "55°", "65°", "75°"]),
    correct: "55°",
    explanation: "Supplementary angles sum to 180°, so 180 - 125 = 55°"
  }
];

// أسئلة الإحصاء والبيانات
const statisticsQuestions = [
  {
    text: "What is the mean of: 12, 15, 18, 21, 24?",
    options: JSON.stringify(["16", "18", "20", "22"]),
    correct: "18",
    explanation: "Mean = (12+15+18+21+24)/5 = 90/5 = 18"
  },
  {
    text: "What is the median of: 5, 12, 8, 15, 3?",
    options: JSON.stringify(["5", "8", "10", "12"]),
    correct: "8",
    explanation: "Ordered: 3, 5, 8, 12, 15. Middle value is 8"
  },
  {
    text: "If a data set has a range of 20 and the minimum is 15, what is the maximum?",
    options: JSON.stringify(["25", "30", "35", "40"]),
    correct: "35",
    explanation: "Range = Max - Min, so Max = 15 + 20 = 35"
  },
  {
    text: "What is the probability of rolling an even number on a standard die?",
    options: JSON.stringify(["1/6", "1/3", "1/2", "2/3"]),
    correct: "1/2",
    explanation: "Even numbers: 2, 4, 6 (3 out of 6) = 3/6 = 1/2"
  },
  {
    text: "In a normal distribution, what percentage of data falls within 1 standard deviation?",
    options: JSON.stringify(["50%", "68%", "95%", "99%"]),
    correct: "68%",
    explanation: "Empirical rule: 68% within 1 SD, 95% within 2 SD"
  },
  {
    text: "If the probability of rain is 0.3, what is the probability of no rain?",
    options: JSON.stringify(["0.3", "0.5", "0.7", "1.0"]),
    correct: "0.7",
    explanation: "P(no rain) = 1 - P(rain) = 1 - 0.3 = 0.7"
  }
];

// أسئلة الفيزياء - الميكانيكا
const mechanicsQuestions = [
  {
    text: "A car travels 120 km in 2 hours. What is its average speed?",
    options: JSON.stringify(["40 km/h", "50 km/h", "60 km/h", "80 km/h"]),
    correct: "60 km/h",
    explanation: "Speed = Distance/Time = 120/2 = 60 km/h"
  },
  {
    text: "What is the force required to accelerate a 5 kg mass at 3 m/s²?",
    options: JSON.stringify(["8 N", "15 N", "18 N", "20 N"]),
    correct: "15 N",
    explanation: "F = ma = 5 × 3 = 15 N"
  },
  {
    text: "An object is dropped from rest. After 3 seconds, what is its velocity? (g = 10 m/s²)",
    options: JSON.stringify(["10 m/s", "20 m/s", "30 m/s", "40 m/s"]),
    correct: "30 m/s",
    explanation: "v = gt = 10 × 3 = 30 m/s"
  },
  {
    text: "What is the kinetic energy of a 2 kg object moving at 4 m/s?",
    options: JSON.stringify(["8 J", "16 J", "32 J", "64 J"]),
    correct: "16 J",
    explanation: "KE = ½mv² = ½ × 2 × 16 = 16 J"
  },
  {
    text: "A 10 N force is applied to move an object 5 meters. What is the work done?",
    options: JSON.stringify(["2 J", "15 J", "50 J", "100 J"]),
    correct: "50 J",
    explanation: "Work = Force × Distance = 10 × 5 = 50 J"
  },
  {
    text: "What is the momentum of a 1000 kg car moving at 20 m/s?",
    options: JSON.stringify(["500 kg·m/s", "2000 kg·m/s", "20000 kg·m/s", "50000 kg·m/s"]),
    correct: "20000 kg·m/s",
    explanation: "Momentum = mv = 1000 × 20 = 20000 kg·m/s"
  }
];

// أسئلة الكهرباء
const electricityQuestions = [
  {
    text: "If V = 12V and R = 4Ω, what is the current?",
    options: JSON.stringify(["2 A", "3 A", "4 A", "6 A"]),
    correct: "3 A",
    explanation: "I = V/R = 12/4 = 3 A (Ohm's Law)"
  },
  {
    text: "What is the power dissipated by a 10Ω resistor with 2A current?",
    options: JSON.stringify(["20 W", "40 W", "50 W", "100 W"]),
    correct: "40 W",
    explanation: "P = I²R = 4 × 10 = 40 W"
  },
  {
    text: "Two 6Ω resistors are connected in series. What is the total resistance?",
    options: JSON.stringify(["3Ω", "6Ω", "12Ω", "36Ω"]),
    correct: "12Ω",
    explanation: "Series: R_total = R₁ + R₂ = 6 + 6 = 12Ω"
  },
  {
    text: "Two 6Ω resistors are connected in parallel. What is the total resistance?",
    options: JSON.stringify(["3Ω", "6Ω", "12Ω", "36Ω"]),
    correct: "3Ω",
    explanation: "Parallel: 1/R = 1/6 + 1/6 = 2/6, so R = 3Ω"
  },
  {
    text: "What is the energy consumed by a 100W bulb in 5 hours?",
    options: JSON.stringify(["0.5 kWh", "1 kWh", "5 kWh", "10 kWh"]),
    correct: "0.5 kWh",
    explanation: "Energy = Power × Time = 100W × 5h = 500 Wh = 0.5 kWh"
  },
  {
    text: "A battery provides 9V. If a circuit draws 0.5A, what is the power?",
    options: JSON.stringify(["3.5 W", "4.5 W", "9 W", "18 W"]),
    correct: "4.5 W",
    explanation: "P = VI = 9 × 0.5 = 4.5 W"
  }
];

// أسئلة الكيمياء - الذرة والروابط
const atomicQuestions = [
  {
    text: "How many protons does carbon have?",
    options: JSON.stringify(["4", "6", "8", "12"]),
    correct: "6",
    explanation: "Carbon atomic number is 6, so it has 6 protons"
  },
  {
    text: "What type of bond is formed in NaCl?",
    options: JSON.stringify(["Covalent", "Ionic", "Metallic", "Hydrogen"]),
    correct: "Ionic",
    explanation: "Na transfers electron to Cl, forming ionic bond"
  },
  {
    text: "What is the electron configuration of oxygen (atomic number 8)?",
    options: JSON.stringify(["1s² 2s² 2p⁴", "1s² 2s² 2p⁶", "1s² 2s² 2p²", "1s² 2s²"]),
    correct: "1s² 2s² 2p⁴",
    explanation: "Oxygen has 8 electrons: 2 in 1s, 2 in 2s, 4 in 2p"
  },
  {
    text: "Which element is in Group 18, Period 2?",
    options: JSON.stringify(["Helium", "Neon", "Argon", "Krypton"]),
    correct: "Neon",
    explanation: "Neon is a noble gas in Group 18, Period 2"
  },
  {
    text: "What is the mass number of an atom with 6 protons and 7 neutrons?",
    options: JSON.stringify(["6", "7", "13", "19"]),
    correct: "13",
    explanation: "Mass number = protons + neutrons = 6 + 7 = 13"
  },
  {
    text: "How many valence electrons does nitrogen have?",
    options: JSON.stringify(["3", "5", "7", "8"]),
    correct: "5",
    explanation: "Nitrogen (Group 15) has 5 valence electrons"
  }
];

// أسئلة الكيمياء - التفاعلات
const reactionsQuestions = [
  {
    text: "Balance: H₂ + O₂ → H₂O",
    options: JSON.stringify(["2H₂ + O₂ → 2H₂O", "H₂ + O₂ → H₂O", "2H₂ + 2O₂ → 2H₂O", "H₂ + 2O₂ → 2H₂O"]),
    correct: "2H₂ + O₂ → 2H₂O",
    explanation: "Need 4 H and 2 O on each side"
  },
  {
    text: "What type of reaction is: 2Na + Cl₂ → 2NaCl?",
    options: JSON.stringify(["Decomposition", "Combination", "Displacement", "Combustion"]),
    correct: "Combination",
    explanation: "Two elements combine to form one compound"
  },
  {
    text: "How many moles in 44g of CO₂? (Molar mass = 44 g/mol)",
    options: JSON.stringify(["0.5 mol", "1 mol", "2 mol", "44 mol"]),
    correct: "1 mol",
    explanation: "Moles = mass/molar mass = 44/44 = 1 mol"
  },
  {
    text: "What is the pH of a neutral solution?",
    options: JSON.stringify(["0", "7", "14", "10"]),
    correct: "7",
    explanation: "pH 7 is neutral, below 7 is acidic, above 7 is basic"
  },
  {
    text: "In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, what type of reaction is this?",
    options: JSON.stringify(["Combination", "Decomposition", "Displacement", "Double displacement"]),
    correct: "Displacement",
    explanation: "Zinc displaces copper from copper sulfate"
  },
  {
    text: "What happens to the rate of reaction when temperature increases?",
    options: JSON.stringify(["Decreases", "Increases", "Stays same", "Stops"]),
    correct: "Increases",
    explanation: "Higher temperature increases molecular collisions"
  }
];

// أسئلة الإنجليزي - القراءة
const readingQuestions = [
  {
    text: "Read: 'The Industrial Revolution marked a major turning point in history. Almost every aspect of daily life was influenced.' What is the main idea?",
    options: JSON.stringify(["It was unimportant", "It greatly changed daily life", "Daily life remained the same", "Only some aspects were affected"]),
    correct: "It greatly changed daily life",
    explanation: "Passage says it was a 'major turning point' affecting 'almost every aspect'"
  },
  {
    text: "What does 'meticulous' mean?",
    options: JSON.stringify(["Careless", "Showing great attention to detail", "Confused", "Angry"]),
    correct: "Showing great attention to detail",
    explanation: "Meticulous means very careful and precise"
  },
  {
    text: "In 'The arid desert climate made it difficult to grow crops', what does 'arid' mean?",
    options: JSON.stringify(["Wet", "Extremely dry", "Cold", "Fertile"]),
    correct: "Extremely dry",
    explanation: "Context clues 'desert' and 'difficult to grow' indicate dryness"
  },
  {
    text: "What is the tone of: 'Despite numerous setbacks, she persevered and achieved her dreams'?",
    options: JSON.stringify(["Pessimistic", "Inspirational", "Humorous", "Critical"]),
    correct: "Inspirational",
    explanation: "The passage shows determination and success despite challenges"
  },
  {
    text: "Choose the best summary: 'Bees pollinate flowers while collecting nectar. This helps plants reproduce and produces honey.'",
    options: JSON.stringify(["Bees make honey", "Bees help plants and make honey", "Plants need water", "Flowers are colorful"]),
    correct: "Bees help plants and make honey",
    explanation: "Summary should include both pollination and honey production"
  },
  {
    text: "What can you infer? 'John grabbed his umbrella before leaving the house.'",
    options: JSON.stringify(["It's sunny", "It might rain", "He's going swimming", "He forgot his keys"]),
    correct: "It might rain",
    explanation: "People take umbrellas when rain is expected"
  }
];

// أسئلة الإنجليزي - القواعد
const grammarQuestions = [
  {
    text: "Choose the correct sentence:",
    options: JSON.stringify(["She don't like apples", "She doesn't likes apples", "She doesn't like apples", "She not like apples"]),
    correct: "She doesn't like apples",
    explanation: "Third person singular requires 'doesn't' + base verb"
  },
  {
    text: "Which sentence is correct?",
    options: JSON.stringify(["The students was studying", "The students were studying", "The students is studying", "The students studying"]),
    correct: "The students were studying",
    explanation: "Plural subject 'students' requires plural verb 'were'"
  },
  {
    text: "Complete: 'If I _____ rich, I would travel the world.'",
    options: JSON.stringify(["am", "was", "were", "be"]),
    correct: "were",
    explanation: "Second conditional uses 'were' for hypothetical situations"
  },
  {
    text: "Choose the correct punctuation:",
    options: JSON.stringify(["Its a beautiful day", "It's a beautiful day", "Its' a beautiful day", "It is' a beautiful day"]),
    correct: "It's a beautiful day",
    explanation: "It's = It is (contraction needs apostrophe)"
  },
  {
    text: "Which word is a conjunction?",
    options: JSON.stringify(["Quickly", "And", "Beautiful", "Run"]),
    correct: "And",
    explanation: "Conjunctions connect words, phrases, or clauses"
  },
  {
    text: "Choose the correct form: 'She has _____ to the store.'",
    options: JSON.stringify(["go", "went", "gone", "going"]),
    correct: "gone",
    explanation: "Present perfect: has/have + past participle (gone)"
  }
];

async function addQuestionsToAllExams() {
  console.log(' بدء إضافة الأسئلة لجميع الامتحانات...\n');

  try {
    const exams = await prisma.exam.findMany({
      include: { questions: true }
    });

    console.log(`📊 إجمالي الامتحانات: ${exams.length}\n`);

    let totalAdded = 0;

    for (const exam of exams) {
      // لو الامتحان فاضي أو فيه أقل من 3 أسئلة، نضيف له
      if (exam.questions.length < 3) {
        let questionsToAdd: any[] = [];

        // نختار الأسئلة المناسبة حسب المادة
        if (exam.subject === 'Math') {
          if (exam.title.toLowerCase().includes('algebra')) {
            questionsToAdd = algebraQuestions;
          } else if (exam.title.toLowerCase().includes('geometry') || exam.title.toLowerCase().includes('trigonometry')) {
            questionsToAdd = geometryQuestions;
          } else if (exam.title.toLowerCase().includes('statistics') || exam.title.toLowerCase().includes('data')) {
            questionsToAdd = statisticsQuestions;
          } else {
            // نخلط كل أسئلة الماث
            questionsToAdd = [...algebraQuestions, ...geometryQuestions, ...statisticsQuestions].sort(() => Math.random() - 0.5).slice(0, 6);
          }
        } else if (exam.subject === 'Physics') {
          if (exam.title.toLowerCase().includes('mechanics')) {
            questionsToAdd = mechanicsQuestions;
          } else if (exam.title.toLowerCase().includes('electricity')) {
            questionsToAdd = electricityQuestions;
          } else {
            questionsToAdd = [...mechanicsQuestions, ...electricityQuestions].sort(() => Math.random() - 0.5).slice(0, 6);
          }
        } else if (exam.subject === 'Chemistry') {
          if (exam.title.toLowerCase().includes('atomic') || exam.title.toLowerCase().includes('bonding')) {
            questionsToAdd = atomicQuestions;
          } else if (exam.title.toLowerCase().includes('reaction')) {
            questionsToAdd = reactionsQuestions;
          } else {
            questionsToAdd = [...atomicQuestions, ...reactionsQuestions].sort(() => Math.random() - 0.5).slice(0, 6);
          }
        } else if (exam.subject === 'English') {
          if (exam.title.toLowerCase().includes('reading')) {
            questionsToAdd = readingQuestions;
          } else if (exam.title.toLowerCase().includes('grammar')) {
            questionsToAdd = grammarQuestions;
          } else {
            questionsToAdd = [...readingQuestions, ...grammarQuestions].sort(() => Math.random() - 0.5).slice(0, 6);
          }
        }

        // نضيف الأسئلة للامتحان
        if (questionsToAdd.length > 0) {
          await prisma.question.createMany({
            data: questionsToAdd.map(q => ({
              ...q,
              examId: exam.id
            }))
          });

          totalAdded += questionsToAdd.length;
          console.log(`✅ ${exam.title}: أضيف ${questionsToAdd.length} سؤال`);
        }
      }
    }

    console.log(`\n🎉 تم إضافة ${totalAdded} سؤال إجمالي!`);
    console.log('✅ كل الامتحانات دلوقتي عندها محتوى!');

  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addQuestionsToAllExams();