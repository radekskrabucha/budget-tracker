import { Home, LayoutDashboard, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Logo } from '~/web/components/Logo'
import { appName, InternalLink } from '~/web/config/app'
import { getSession } from '~/web/features/auth/serverActions'
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
    <div className="layout-container min-h-dvh !flex-row max-md:!flex-col">
      {/* Mobile Header */}
      <header className="border-border bg-card flex-start sticky top-0 z-10 flex border-b p-6 md:hidden">
        <Link
          href={InternalLink.home}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo />
          <span className="text-lg font-semibold">{appName}</span>
        </Link>
      </header>

      {/* Sidebar */}
      <aside className="border-border text-card-foreground bg-card sticky top-0 z-10 flex h-dvh w-64 flex-col border-r max-md:fixed max-md:top-auto max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:h-auto max-md:w-full max-md:border-t max-md:border-r-0">
        {/* Desktop Logo */}
        <div className="border-border border-b p-6 max-md:hidden">
          <Link
            href={InternalLink.home}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Logo />
            <span className="text-lg font-semibold">{appName}</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 max-md:hidden">
          <div className="px-2 py-4">
            <h2 className="text-muted-foreground text-lg font-semibold">
              Welcome, {session.user.name}
            </h2>
          </div>
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

        {/* Mobile Navigation */}
        <nav className="md:hidden">
          <ul className="flex items-center justify-around p-4">
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

        {/* Desktop Sign Out */}
        <div className="border-border border-t p-4 max-md:hidden">
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="isolate flex flex-1 flex-col max-md:pb-24">
        {children}
      </main>
    </div>
  )
}
