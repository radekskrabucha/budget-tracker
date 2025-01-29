import { Toaster } from '@budget-tracker/ui/components/ui/toaster'
import type { Metadata } from 'next'
import Providers from '~/web/components/Providers'
import { AppName } from '~/web/config/app'
import { MainFont } from '~/web/styles/fonts'
import '~/web/styles/global.css'

export const metadata: Metadata = {
  title: AppName,
  description: 'Budget Tracker app for tracking your finances'
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={`${MainFont.variable} antialiased font-main text-foreground`}
    >
      <Providers>
        {children}
        <Toaster />
      </Providers>
    </body>
  </html>
)

export default RootLayout
