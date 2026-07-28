import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { TrackingPixels } from '@/components/tracking-pixels'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'LLM Seeding Agency | Citation Seeding',
  description: 'Adkompas is an LLM seeding agency specialising in citation seeding, helping brands earn a credible presence across third-party sources that influence AI discovery.", generator: "Adkompas',
  generator: 'v0.app',
  icons: {
    icon: '/images/kompas-logo-transparent.png',
    apple: '/images/kompas-logo-transparent.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <WhatsAppFloatingButton />
        <TrackingPixels />
        <Analytics />
      </body>
    </html>
  )
}
