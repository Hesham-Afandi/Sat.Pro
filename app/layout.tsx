import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SAT PRO | منصة تحضير اختبار SAT",
  description: "منصة تعليمية متكاملة لتحضير اختبار SAT مع كورسات، امتحانات تجريبية، ومتابعة أداء ذكية.",
  keywords: "SAT, اختبار سات, تحضير SAT, كورسات تعليمية, امتحانات تجريبية, منصة تعليمية",
  authors: [{ name: "SAT PRO Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        {/*  مكان الـ SessionProvider لما ترجع تشغل الـ Auth */}
        {/* <SessionProvider>{children}</SessionProvider> */}
        
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
