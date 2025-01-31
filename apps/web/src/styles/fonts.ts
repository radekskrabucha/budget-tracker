import { Geist } from 'next/font/google'

export const MainFont = Geist({
  variable: '--font-main',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif']
})
