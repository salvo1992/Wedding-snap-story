import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FedinoChat } from "@/components/chatbot/fedino-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WeddingSnapStory - Capture Your Special Day",
  description: "A digital wedding photo album for couples, photographers, and guests",
  openGraph: {
    title: "WeddingSnapStory - Capture Your Special Day",
    description: "A digital wedding photo album for couples, photographers, and guests",
    images: ["/opengraph-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <FedinoChat />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'