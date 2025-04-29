import type React from "react"
import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
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
    <html lang="en">
      <body className={`${fredoka.variable} font-fredoka`}>{children}</body>
    </html>
  )
}
