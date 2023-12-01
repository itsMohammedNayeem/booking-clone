import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Booking.com clone',
  description: 'Created with Next JS, Scrape data with Oxylabs, Shadcn UI, Tailwind CSS, and more.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        {/* Header */}
<Header />
        
        {children}</body>
    </html>
  )
}
