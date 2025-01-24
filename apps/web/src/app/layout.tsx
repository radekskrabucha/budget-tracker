import type { Metadata } from 'next'
import { MainFont } from '~/web/styles/fonts'
import '~/web/styles/global.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={`${MainFont.variable} antialiased`}>{children}</body>
  </html>
)

export default RootLayout
