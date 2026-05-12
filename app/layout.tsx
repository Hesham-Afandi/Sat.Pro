import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ✅ استيراد الـ Provider (تأكد إن المسار صح)
// لو المشروع في مجلد، جرب: "@/contexts/LanguageContext"
import { LanguageProvider } from "../contexts/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ الميتا داتا
export const metadata: Metadata = {
  title: "SAT PRO | منصة تحضير اختبار SAT",
  description: "منصة تعليمية متكاملة لتحضير اختبار SAT",
  keywords: "SAT, اختبار سات, تحضير, كورسات",
};

// ✅ الـ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        
        {/* ✅ أهم سطر: لازم الـ Provider يغلف الـ children عشان يشتغلوا */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
        
      </body>
    </html>
  );
}
