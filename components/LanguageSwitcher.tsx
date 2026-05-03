"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-500 transition-all shadow-sm"
    >
      {language === "en" ? "🇸🇦 عربي" : "🇬🇧 English"}
    </button>
  );
}