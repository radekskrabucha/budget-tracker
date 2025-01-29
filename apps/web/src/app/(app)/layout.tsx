import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Logo } from '~/web/components/Logo'
import { InternalLink } from '~/web/config/app'
import { getSession } from '~/web/features/signIn/serverActions'

const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getSession()

  if (!session) {
    return redirect(InternalLink.signIn)
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
            <span className="font-semibold text-lg">{session.user.name}</span>
          </Link>
        </div>
      </header>

      <main className="layout-container isolate flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
