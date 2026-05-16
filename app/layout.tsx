import { Inter } from 'next/font/google'
import './globals.css'

// لو عندك NextAuth Provider، اتركه كما هو
// import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '𝑪𝒐𝒎𝒑𝒂𝒔𝒔 𝑨𝒄𝒂𝒅𝒆𝒎𝒚',
  description: 'احصل على درجتك الكاملة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl"> {/* ده مظبوط، خلي الـ RTL هنا */}
      <body className={inter.className}>
        {/* هنا ممكن يكون فيه خطأ لو حاطط container معين */}
        <main className="min-h-screen">
            {children}
        </main>
      </body>
    </html>
  )
}