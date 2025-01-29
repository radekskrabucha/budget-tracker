import { Home, LayoutDashboard, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Logo } from '~/web/components/Logo'
import { appName, InternalLink } from '~/web/config/app'
import { getSession } from '~/web/features/signIn/serverActions'
import { NavItem } from './components/NavItem'
import { SignOutButton } from './components/SignOutButton'

export const AppLayout: React.FC<React.PropsWithChildren> = async ({
  children
}) => {
  const session = await getSession()

  if (!session) {
    return redirect(InternalLink.signIn)
  }

  return (
    <div className="layout-container !flex-row">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-white/3 text-card-foreground flex flex-col">
        <div className="p-6 border-b border-border">
          <Link
            href={InternalLink.home}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo />
            <span className="font-semibold text-lg">{appName}</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-2">
            <NavItem
              href={InternalLink.home}
              label="Home"
              icon={Home}
            />
            <NavItem
              href={InternalLink.transactions}
              label="Transactions"
              icon={Wallet}
            />
            <NavItem
              href={InternalLink.categories}
              label="Categories"
              icon={LayoutDashboard}
            />
            <NavItem
              href={InternalLink.profile}
              label="Profile"
              icon={User}
            />
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="isolate flex flex-1 flex-col">{children}</main>
    </div>
  )
}
