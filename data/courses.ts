// data/courses.ts

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Exam {
  id: string;
  title: string;
  questions: number;
  duration: string;
  subject: string;
}

export interface Course {
  id: string;
  subject: string;
  title: string;
  instructor: string;
  description: string;
  color: string;
  image: string;
  duration: string;
  lessons: Lesson[];
  exams: Exam[];
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correct: string;
  explanation?: string;
}

export interface ExamData {
  id: string;
  subject: string;
  title: string;
  questions: ExamQuestion[];
}

// ==================== بيانات المواد ====================
export const coursesData: Record<string, Course> = {
  math: {
    id: "math",
    subject: "math",
    title: "الرياضيات المتقدمة - المستوى الأول",
    instructor: "د. أحمد محمد",
    description: "دورة شاملة تغطي الجبر والهندسة وحساب المثلثات.",
    color: "from-blue-500 to-indigo-600",
    image: "📐",
    duration: "12 hours",
    lessons: [
      { id: 1, title: "المعادلات الخطية", duration: "45 دقيقة", completed: true },
      { id: 2, title: "الدوال التربيعية", duration: "50 دقيقة", completed: false },
      { id: 3, title: "حساب المثلثات", duration: "60 دقيقة", completed: false },
    ],
    exams: [
      { id: "math-exam-1", title: "امتحان الجبر", questions: 20, duration: "30 دقيقة", subject: "math" },
      { id: "math-exam-2", title: "امتحان الهندسة", questions: 25, duration: "40 دقيقة", subject: "math" },
    ],
  },

  physics: {
    id: "physics",
    subject: "physics",
    title: "الفيزياء العامة - الميكانيكا",
    instructor: "د. فاطمة علي",
    description: "دراسة الحركة، القوى، والطاقة والديناميكا الحرارية.",
    color: "from-purple-500 to-pink-600",
    image: "⚛️",
    duration: "14 hours",
    lessons: [
      { id: 1, title: "قوانين نيوتن", duration: "50 دقيقة", completed: true },
      { id: 2, title: "الطاقة الحركية", duration: "45 دقيقة", completed: false },
      { id: 3, title: "الدوائر الكهربائية", duration: "60 دقيقة", completed: false },
    ],
    exams: [
      { id: "physics-exam-1", title: "امتحان الحركة", questions: 20, duration: "30 دقيقة", subject: "physics" },
      { id: "physics-exam-2", title: "امتحان الكهرباء", questions: 25, duration: "40 دقيقة", subject: "physics" },
    ],
  },

  chemistry: {
    id: "chemistry",
    subject: "chemistry",
    title: "الكيمياء العضوية - الأساسيات",
    instructor: "د. محمد أحمد",
    description: "مقدمة في المركبات العضوية، التفاعلات، والروابط الكيميائية.",
    color: "from-green-500 to-teal-600",
    image: "🧪",
    duration: "13 hours",
    lessons: [
      { id: 1, title: "الجدول الدوري", duration: "40 دقيقة", completed: true },
      { id: 2, title: "الروابط التساهمية", duration: "55 دقيقة", completed: false },
      { id: 3, title: "التفاعلات الكيميائية", duration: "50 دقيقة", completed: false },
    ],
    exams: [
      { id: "chemistry-exam-1", title: "امتحان الروابط", questions: 20, duration: "30 دقيقة", subject: "chemistry" },
      { id: "chemistry-exam-2", title: "امتحان التفاعلات", questions: 25, duration: "40 دقيقة", subject: "chemistry" },
    ],
  },
};

// ==================== بيانات الامتحانات ====================
export const examsData: Record<string, ExamData> = {
  // رياضيات - جبر
  "math-exam-1": {
    id: "math-exam-1",
    subject: "math",
    title: "امتحان الجبر",
    questions: [
      {
        id: "q1",
        text: "What is the solution to: 2x + 5 = 15?",
        options: ["5", "10", "7.5", "3"],
        correct: "A",
        explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
      },
      {
        id: "q2",
        text: "Solve: 3x - 7 = 8",
        options: ["5", "3", "7", "15"],
        correct: "A",
        explanation: "3x - 7 = 8 → 3x = 15 → x = 5",
      },
      {
        id: "q3",
        text: "If 2x = 10, what is x?",
        options: ["5", "2", "10", "20"],
        correct: "A",
        explanation: "2x = 10 → x = 5",
      },
    ],
  },
  // رياضيات - هندسة
  "math-exam-2": {
    id: "math-exam-2",
    subject: "math",
    title: "امتحان الهندسة",
    questions: [
      {
        id: "q1",
        text: "What is the area of a circle with radius 7cm?",
        options: ["154 cm²", "44 cm²", "147 cm²", "49 cm²"],
        correct: "A",
        explanation: "Area = πr² = (22/7) × 49 = 154 cm²",
      },
      {
        id: "q2",
        text: "What is the perimeter of a square with side 5cm?",
        options: ["20 cm", "25 cm", "15 cm", "10 cm"],
        correct: "A",
        explanation: "Perimeter = 4 × side = 4 × 5 = 20 cm",
      },
      {
        id: "q3",
        text: "What is the sum of angles in a triangle?",
        options: ["180°", "360°", "90°", "270°"],
        correct: "A",
        explanation: "The sum of angles in any triangle is always 180°",
      },
    ],
  },
  // فيزياء - حركة
  "physics-exam-1": {
    id: "physics-exam-1",
    subject: "physics",
    title: "امتحان الحركة",
    questions: [
      {
        id: "q1",
        text: "What is the formula for velocity?",
        options: ["v = d/t", "v = t/d", "v = d×t", "v = d+t"],
        correct: "A",
        explanation: "Velocity = Distance / Time",
      },
      {
        id: "q2",
        text: "If a car travels 100m in 20s, what is its speed?",
        options: ["5 m/s", "20 m/s", "100 m/s", "2 m/s"],
        correct: "A",
        explanation: "Speed = Distance / Time = 100m / 20s = 5 m/s",
      },
      {
        id: "q3",
        text: "What is acceleration?",
        options: ["Change in velocity/time", "Distance/time", "Speed/time", "Force/mass"],
        correct: "A",
        explanation: "Acceleration is the rate of change of velocity with respect to time",
      },
    ],
  },
  // فيزياء - قوى
  "physics-exam-2": {
    id: "physics-exam-2",
    subject: "physics",
    title: "امتحان القوى",
    questions: [
      {
        id: "q1",
        text: "What is Newton's Second Law?",
        options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
        correct: "A",
        explanation: "Force = mass × acceleration",
      },
      {
        id: "q2",
        text: "If mass = 10kg and acceleration = 2m/s², what is the force?",
        options: ["20 N", "5 N", "12 N", "100 N"],
        correct: "A",
        explanation: "F = ma = 10 × 2 = 20 N",
      },
      {
        id: "q3",
        text: "What is the unit of force?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correct: "A",
        explanation: "The SI unit of force is Newton (N)",
      },
    ],
  },
  // كيمياء - هيدروكربونات
  "chemistry-exam-1": {
    id: "chemistry-exam-1",
    subject: "chemistry",
    title: "امتحان الهيدروكربونات",
    questions: [
      {
        id: "q1",
        text: "What is the molecular formula of methane?",
        options: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"],
        correct: "A",
        explanation: "Methane is the simplest alkane with formula CH₄",
      },
      {
        id: "q2",
        text: "What type of bond is in alkanes?",
        options: ["Single bond", "Double bond", "Triple bond", "Ionic bond"],
        correct: "A",
        explanation: "Alkanes contain only single covalent bonds",
      },
      {
        id: "q3",
        text: "What is the general formula for alkanes?",
        options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂₋₂", "CₙHₙ"],
        correct: "A",
        explanation: "Alkanes follow the formula CₙH₂ₙ₊₂",
      },
    ],
  },
  // كيمياء - تفاعلات
  "chemistry-exam-2": {
    id: "chemistry-exam-2",
    subject: "chemistry",
    title: "امتحان التفاعلات",
    questions: [
      {
        id: "q1",
        text: "What is a chemical reaction?",
        options: ["Process that changes substances", "Physical change", "Mixing substances", "Heating substances"],
        correct: "A",
        explanation: "A chemical reaction transforms reactants into products",
      },
      {
        id: "q2",
        text: "What is the reactant in combustion?",
        options: ["Oxygen", "Water", "Carbon dioxide", "Nitrogen"],
        correct: "A",
        explanation: "Combustion requires oxygen as a reactant",
      },
      {
        id: "q3",
        text: "What type of reaction is: A + B → AB?",
        options: ["Synthesis", "Decomposition", "Combustion", "Replacement"],
        correct: "A",
        explanation: "Two substances combining to form one is a synthesis reaction",
      },
    ],
  },
};