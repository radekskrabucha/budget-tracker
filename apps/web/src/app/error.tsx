'use client'

import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => (
  <div className="layout-container min-h-dvh">
    <section className="layout-section flex-1 items-center justify-center gap-4 text-center">
      <h1 className="text-destructive text-6xl font-bold">Error</h1>
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground">
        An unexpected error has occurred. Please try again or contact support.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className={buttonVariants()}
        >
          Try again
        </button>
        <Link
          href={InternalLink.home}
          className={buttonVariants({ variant: 'outline' })}
        >
          Go back home
        </Link>
      </div>
      <pre className="text-muted-foreground text-xs">{error.message}</pre>
    </section>
  </div>
)

export default Error
