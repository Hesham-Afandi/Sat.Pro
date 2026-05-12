"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

// ✅ تعريف نوع الـ Context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

// ✅ إنشاء الـ Context بقيمة افتراضية
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ✅ الـ Provider اللي هيغلف التطبيق
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>("ar");

  // ✅ تحسين الأداء: تمنع إعادة الـ Render غير الضرورية
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ✅ الـ Hook اللي هتستخدمه في الصفحات عشان تجيب اللغة
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
