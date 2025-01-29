import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'

export default function NotFound() {
  return (
    <div className="layout-container min-h-dvh">
      <section className="layout-section items-center gap-4 text-center flex-1 justify-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href={InternalLink.home}
          className={buttonVariants()}
        >
          Go back home
        </Link>
      </section>
    </div>
  )
}
