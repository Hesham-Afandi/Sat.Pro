"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>("ar");
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ✅ الحل: نرجع قيمة افتراضية بدل ما نرمي خطأ
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  // لو مفيش Provider، نرجع قيم افتراضية عشان الموقع ميقعش
  if (context === undefined) {
    return { 
      language: "ar", 
      setLanguage: () => {} 
    };
  }
  
  return context;
}
