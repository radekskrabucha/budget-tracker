import { getFullYear } from '@budget-tracker/utils'
import { Github, Code2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Logo } from '~/web/components/Logo'
import {
  appName,
  ExternalLink,
  InternalLink,
  ownerEmail
} from '~/web/config/app'
import { getSession } from '~/web/features/signIn/serverActions'
import { IconLink } from './components/IconLink'

export const AuthLayout: React.FC<React.PropsWithChildren> = async ({
  children
}) => {
  const session = await getSession()

  if (session) {
    return redirect(InternalLink.home)
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden bg-background">
      <header className="layout-container border-b">
        <div className="layout-section">
          <Link
            href={InternalLink.home}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo />
            <span className="font-semibold text-lg">Budget Tracker</span>
          </Link>
        </div>
      </header>

      <main className="layout-container isolate flex-1 overflow-x-hidden">
        {children}
      </main>

      <footer className="layout-container border-t">
        <div className="layout-section items-center text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {getFullYear()} {appName}. All rights reserved.
            </p>

            <div className="flex gap-4 flex-wrap justify-center items-center">
              <IconLink
                href={ExternalLink.github}
                icon={<Github className="w-5 h-5" />}
                label="GitHub"
              />
              <IconLink
                href={ExternalLink.sourceCode}
                icon={<Code2 className="w-5 h-5" />}
                label="Source Code"
              />

              <Link
                href={ExternalLink.email}
                className="text-muted-foreground/80 hover:text-primary transition-colors"
              >
                {ownerEmail}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
