import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "NavajaFy",
  description: "A melhor plataforma para agendamento de barbearias",
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="dark relative min-h-screen overflow-hidden">
          <div className="fixed inset-0 -z-10">
            <div className="via-background/98 absolute inset-0 bg-gradient-to-br from-background to-background/95" />
            <div className="absolute inset-0">
              <div className="to-chart-1/15 animate-dark-float-1 absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 blur-3xl" />
              <div className="from-chart-2/18 to-primary/12 animate-dark-float-2 absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />
              <div className="from-chart-3/20 to-chart-4/15 animate-dark-float-3 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl" />
              <div className="animate-dark-wave-1 absolute left-1/4 top-1/3 h-40 w-40 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-2xl" />
              <div className="from-chart-5/20 animate-dark-wave-2 absolute bottom-1/2 right-1/3 h-48 w-48 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
              <div className="left-1/6 from-chart-1/22 animate-dark-wave-3 absolute top-3/4 h-32 w-32 rounded-full bg-gradient-to-br to-transparent blur-xl" />
              <div className="top-1/6 animate-dark-spin-slow absolute right-1/4 h-20 w-20 rotate-45 border-2 border-primary/30" />
              <div className="top-1/6 animate-dark-spin-slow absolute bottom-10 left-16 h-20 w-20 rotate-45 border-2 border-primary/30" />
              <div className="absolute inset-0">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-dark-particle absolute h-1 w-1 rounded-full bg-primary/40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 12}s`,
                      animationDuration: `${10 + Math.random() * 6}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <AuthProvider>
            <div className="relative flex flex-1 flex-col">{children}</div>
            <Toaster richColors position="top-center" />
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
