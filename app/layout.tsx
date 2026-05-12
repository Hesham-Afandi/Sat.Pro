import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ✅ استورد الـ LanguageProvider (عدل المسار لو مختلف عندك)
import { LanguageProvider } from "@/contexts/LanguageContext"; 
// أو: import { LanguageProvider } from "@/components/LanguageProvider";

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
        
        {/* ✅ لازم تحط الـ LanguageProvider هنا عشان يغطي كل الأطفال */}
        <LanguageProvider>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </LanguageProvider>
        
      </body>
    </html>
  );
}
