"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    features: "Features",
    subjects: "Subjects",
    pricing: "Pricing",
    dashboard: "Dashboard",
    signIn: "Sign In",
    getStarted: "Get Started",
    hero_badge: "🎓 #1 SAT Preparation Platform",
    hero_title_1: "Master Your",
    hero_title_2: "SAT Exam",
    hero_description: "Join thousands of students achieving their dream scores with our comprehensive SAT preparation platform.",
    start_free_trial: "Start Free Trial",
    learn_more: "Learn More",
    students: "Students",
    success_rate: "Success Rate",
    tests_taken: "Tests Taken",
    feature_1: "Personalized Study Plan",
    feature_2: "Real-time Progress Tracking",
    feature_3: "Expert Instructors",
    why_choose_us: "Why Choose Us",
    why_choose_us_desc: "We provide the best learning experience for SAT preparation",
    smart_analytics: "Smart Analytics",
    smart_analytics_desc: "Track your progress with detailed analytics",
    practice_tests: "Practice Tests",
    practice_tests_desc: "Unlimited practice tests with real questions",
    video_lessons: "Video Lessons",
    video_lessons_desc: "Learn from expert instructors",
    our_subjects: "Our Subjects",
    subjects_desc: "Comprehensive courses in Math, Physics, and Chemistry",
    math: "Mathematics",
    math_desc: "Algebra, Geometry, Calculus and more",
    physics: "Physics",
    physics_desc: "Mechanics, Electricity, Magnetism",
    chemistry: "Chemistry",
    chemistry_desc: "Organic, Inorganic, Physical Chemistry",
    view_courses: "View Courses",
    footer_rights: "All rights reserved",
    welcome_back: "Welcome Back",
    sign_in_desc: "Sign in to your account to continue",
    email: "Email",
    email_placeholder: "you@example.com",
    password: "Password",
    password_placeholder: "••••••••",
    signing_in: "Signing in...",
    no_account: "Don't have an account?",
    sign_up: "Sign Up",
    back_to_home: "Back to Home",
    invalid_credentials: "Invalid email or password",
    something_went_wrong: "Something went wrong",
    signOut: "Sign Out",
    welcome: "Welcome",
    dashboard_desc: "Your learning dashboard",
    language: "Language",
  },
  ar: {
    features: "المميزات",
    subjects: "المواد",
    pricing: "الأسعار",
    dashboard: "لوحة التحكم",
    signIn: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
    hero_badge: "🎓 المنصة الأولى للتحضير لـ SAT",
    hero_title_1: "أتقن",
    hero_title_2: "اختبار SAT",
    hero_description: "انضم لآلاف الطلاب وحقق حلمك مع منصتنا الشاملة للتحضير لاختبار SAT",
    start_free_trial: "ابدأ التجربة المجانية",
    learn_more: "اعرف المزيد",
    students: "طالب",
    success_rate: "نسبة النجاح",
    tests_taken: "اختبار",
    feature_1: "خطة دراسة مخصصة",
    feature_2: "متابعة التقدم لحظياً",
    feature_3: "مدربون خبراء",
    why_choose_us: "لماذا تختارنا",
    why_choose_us_desc: "نقدم أفضل تجربة تعلم للتحضير لاختبار SAT",
    smart_analytics: "تحليلات ذكية",
    smart_analytics_desc: "تابع تقدمك مع تحليلات مفصلة",
    practice_tests: "اختبارات تدريبية",
    practice_tests_desc: "اختبارات غير محدودة بأسئلة حقيقية",
    video_lessons: "دروس فيديو",
    video_lessons_desc: "تعلم من مدربين خبراء",
    our_subjects: "موادنا الدراسية",
    subjects_desc: "دورات شاملة في الرياضيات والفيزياء والكيمياء",
    math: "الرياضيات",
    math_desc: "الجبر والهندسة والتفاضل والتكامل",
    physics: "الفيزياء",
    physics_desc: "الميكانيكا والكهرباء والمغناطيسية",
    chemistry: "الكيمياء",
    chemistry_desc: "العضوية وغير العضوية والكيمياء الفيزيائية",
    view_courses: "عرض الدورات",
    footer_rights: "جميع الحقوق محفوظة",
    welcome_back: "مرحباً بعودتك",
    sign_in_desc: "سجل دخولك للمتابعة",
    email: "البريد الإلكتروني",
    email_placeholder: "you@example.com",
    password: "كلمة المرور",
    password_placeholder: "••••••••",
    signing_in: "جاري الدخول...",
    no_account: "ليس لديك حساب؟",
    sign_up: "إنشاء حساب",
    back_to_home: "العودة للرئيسية",
    invalid_credentials: "البريد أو كلمة المرور غير صحيحة",
    something_went_wrong: "حدث خطأ ما",
    signOut: "تسجيل الخروج",
    welcome: "مرحباً",
    dashboard_desc: "لوحة التحكم الخاصة بك",
    language: "اللغة",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (key: string) => {
    if (!mounted) return key;
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}