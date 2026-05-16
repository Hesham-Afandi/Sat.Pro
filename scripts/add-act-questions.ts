import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// أسئلة ACT English (قواعد وكتابة)
const actEnglishQuestions = [
  {
    text: "Choose the best version of the underlined portion: 'The dog barked loudly at the mailman who was delivering the package.'",
    options: JSON.stringify(["NO CHANGE", "barked, loudly", "barked loudly,", "barked, loudly,"]),
    correct: "NO CHANGE",
    explanation: "The sentence is correct as written. No commas are needed."
  },
  {
    text: "Which choice best maintains the sentence pattern already established in the paragraph?",
    options: JSON.stringify(["The cat slept peacefully on the warm windowsill.", "Sleeping peacefully was the cat on the windowsill.", "On the windowsill, the cat was sleeping peacefully.", "Peacefully sleeping on the windowsill was the cat."]),
    correct: "The cat slept peacefully on the warm windowsill.",
    explanation: "Subject-Verb-Adverb-Prepositional phrase pattern is most consistent."
  },
  {
    text: "Should the writer delete the underlined portion: 'The experiment was successful, and the results were published in a scientific journal.'?",
    options: JSON.stringify(["Yes, because it is redundant", "Yes, because it contradicts the previous sentence", "No, because it provides important additional information", "No, because it introduces a new topic"]),
    correct: "No, because it provides important additional information",
    explanation: "The clause adds relevant information about the outcome."
  },
  {
    text: "Choose the correct punctuation: 'My favorite subjects are mathematics science and history.'",
    options: JSON.stringify(["mathematics, science, and history", "mathematics science, and history", "mathematics, science and history", "mathematics science and history,"]),
    correct: "mathematics, science, and history",
    explanation: "Items in a series need commas, including before 'and' (Oxford comma)."
  },
  {
    text: "Which choice provides the most relevant detail?",
    options: JSON.stringify(["The book was published in 2019.", "The book won the Pulitzer Prize for Fiction.", "The book has 350 pages.", "The book is available in hardcover."]),
    correct: "The book won the Pulitzer Prize for Fiction.",
    explanation: "This detail is most significant and relevant to the book's importance."
  },
  {
    text: "Choose the correct verb tense: 'By the time we arrived, the movie _____ already started.'",
    options: JSON.stringify(["has", "had", "have", "was"]),
    correct: "had",
    explanation: "Past perfect tense is needed for an action completed before another past action."
  }
];

// أسئلة ACT Math
const actMathQuestions = [
  {
    text: "What is the value of x if 3x - 7 = 2x + 5?",
    options: JSON.stringify(["8", "10", "12", "15"]),
    correct: "12",
    explanation: "3x - 2x = 5 + 7, so x = 12"
  },
  {
    text: "If f(x) = x² - 4x + 3, what is f(5)?",
    options: JSON.stringify(["6", "8", "10", "12"]),
    correct: "8",
    explanation: "f(5) = 25 - 20 + 3 = 8"
  },
  {
    text: "What is the slope of the line passing through points (2, 5) and (6, 13)?",
    options: JSON.stringify(["1", "2", "3", "4"]),
    correct: "2",
    explanation: "Slope = (13-5)/(6-2) = 8/4 = 2"
  },
  {
    text: "In a right triangle, if one leg is 6 and the hypotenuse is 10, what is the other leg?",
    options: JSON.stringify(["6", "8", "10", "12"]),
    correct: "8",
    explanation: "Using Pythagorean theorem: a² + 36 = 100, so a² = 64, a = 8"
  },
  {
    text: "What is the area of a circle with radius 7? (Use π = 22/7)",
    options: JSON.stringify(["14", "44", "154", "308"]),
    correct: "154",
    explanation: "Area = πr² = (22/7) × 49 = 154"
  },
  {
    text: "If log₂(x) = 5, what is x?",
    options: JSON.stringify(["10", "25", "32", "64"]),
    correct: "32",
    explanation: "x = 2⁵ = 32"
  }
];

// أسئلة ACT Reading
const actReadingQuestions = [
  {
    text: "Based on the passage, the author's primary purpose is to:",
    options: JSON.stringify(["Entertain with a humorous story", "Inform about a historical event", "Persuade readers to take action", "Describe a personal experience"]),
    correct: "Inform about a historical event",
    explanation: "The passage provides factual information about a historical occurrence."
  },
  {
    text: "The word 'meticulous' in line 15 most nearly means:",
    options: JSON.stringify(["Careless", "Very careful and precise", "Quick and efficient", "Creative and imaginative"]),
    correct: "Very careful and precise",
    explanation: "Meticulous means showing great attention to detail."
  },
  {
    text: "According to the passage, which of the following is TRUE about the main character?",
    options: JSON.stringify(["She was born in Europe", "She moved to America as a child", "She never traveled abroad", "She was a famous artist"]),
    correct: "She moved to America as a child",
    explanation: "The passage states she immigrated at age 8."
  },
  {
    text: "The author mentions 'the storm' primarily to:",
    options: JSON.stringify(["Create suspense", "Symbolize conflict", "Provide weather details", "Introduce a new character"]),
    correct: "Symbolize conflict",
    explanation: "The storm represents the internal struggle of the protagonist."
  },
  {
    text: "It can reasonably be inferred from the passage that:",
    options: JSON.stringify(["The narrator is unreliable", "The setting is in winter", "The characters are related", "The event happened recently"]),
    correct: "The setting is in winter",
    explanation: "References to snow and cold indicate winter setting."
  },
  {
    text: "The passage suggests that the scientist's discovery was:",
    options: JSON.stringify(["Immediately accepted by the community", "Initially met with skepticism", "Based on faulty data", "Unimportant to the field"]),
    correct: "Initially met with skepticism",
    explanation: "The passage describes resistance from other scientists."
  }
];

// أسئلة ACT Science
const actScienceQuestions = [
  {
    text: "According to Table 1, as temperature increases, what happens to the reaction rate?",
    options: JSON.stringify(["It decreases", "It remains constant", "It increases", "It fluctuates randomly"]),
    correct: "It increases",
    explanation: "The data shows a direct relationship between temperature and rate."
  },
  {
    text: "Based on Figure 2, at what pH level is enzyme activity highest?",
    options: JSON.stringify(["pH 3", "pH 5", "pH 7", "pH 9"]),
    correct: "pH 7",
    explanation: "The graph peaks at pH 7, indicating optimal activity."
  },
  {
    text: "If Experiment 1 were repeated with double the concentration, the results would most likely:",
    options: JSON.stringify(["Show no change", "Decrease by half", "Double", "Quadruple"]),
    correct: "Double",
    explanation: "Based on the proportional relationship shown in the data."
  },
  {
    text: "Which hypothesis is best supported by the data in Table 3?",
    options: JSON.stringify(["More light leads to faster growth", "Less water leads to faster growth", "Temperature has no effect", "Soil type is most important"]),
    correct: "More light leads to faster growth",
    explanation: "Plants with more light exposure showed greater height increase."
  },
  {
    text: "According to the passage, Scientist 2 would most likely agree that:",
    options: JSON.stringify(["Climate change is primarily natural", "Human activity is the main cause", "The data is inconclusive", "Temperatures will decrease"]),
    correct: "Human activity is the main cause",
    explanation: "Scientist 2 emphasizes anthropogenic factors in the passage."
  },
  {
    text: "The main point of disagreement between the scientists is:",
    options: JSON.stringify(["Whether the phenomenon exists", "The cause of the phenomenon", "When the phenomenon started", "How to measure the phenomenon"]),
    correct: "The cause of the phenomenon",
    explanation: "Both agree it exists but differ on causation."
  }
];

async function addACTQuestions() {
  console.log('📝 بدء إضافة أسئلة ACT...\n');

  try {
    // نجيب امتحانات ACT
    const actExams = await prisma.exam.findMany({
      where: {
        OR: [
          { subject: { contains: 'ACT' } },
          { title: { contains: 'ACT' } }
        ]
      },
      include: { questions: true }
    });

    if (actExams.length === 0) {
      console.log('❌ مش لاقي امتحانات ACT! شغل السكريبت الأول (add-act-content.ts)');
      return;
    }

    console.log(`📊 وجدت ${actExams.length} امتحان ACT\n`);

    let totalAdded = 0;

    for (const exam of actExams) {
      if (exam.questions.length < 3) {
        let questionsToAdd: any[] = [];

        const examTitle = exam.title.toLowerCase();
        const examSubject = exam.subject?.toLowerCase() || '';

        if (examSubject.includes('english')) {
          questionsToAdd = actEnglishQuestions;
        } else if (examSubject.includes('math')) {
          questionsToAdd = actMathQuestions;
        } else if (examSubject.includes('reading')) {
          questionsToAdd = actReadingQuestions;
        } else if (examSubject.includes('science')) {
          questionsToAdd = actScienceQuestions;
        } else {
          // لو مش معروف، نخلط الأسئلة
          questionsToAdd = [
            ...actEnglishQuestions,
            ...actMathQuestions,
            ...actReadingQuestions,
            ...actScienceQuestions
          ].sort(() => Math.random() - 0.5).slice(0, 6);
        }

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

    console.log(`\n🎉 تم إضافة ${totalAdded} سؤال لـ ACT!`);
    console.log('✅ امتحانات ACT جاهزة الآن!');

  } catch (error: any) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addACTQuestions();