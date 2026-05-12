import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ✅ استورد الـ LanguageProvider من المكان الصح
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SAT PRO | منصة تحضير اختبار SAT",
  description: "منصة تعليمية متكاملة لتحضير اختبار SAT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        
        {/* ✅ دي النقطة المهمة: لازم الـ Provider يغلف الـ children */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
        
      </body>
    </html>
  );
}
