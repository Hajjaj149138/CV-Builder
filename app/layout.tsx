import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CV Builder – ATS-Ready Resume Maker',
  description: 'Build and download a professional ATS-optimized CV as a real PDF.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
