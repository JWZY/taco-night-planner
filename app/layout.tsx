import type React from "react"
import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
})

export const metadata: Metadata = {
  title: "Taco Night Planner",
  description: "Assign taco ingredients to your friends",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.variable} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="font-fredoka min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
