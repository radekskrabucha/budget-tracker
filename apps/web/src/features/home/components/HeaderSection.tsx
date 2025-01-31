import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'

export const HeaderSection = () => (
  <section className="layout-section !flex-row flex-wrap items-center justify-between gap-4">
    <h2 className="text-2xl font-semibold">Dashboard</h2>
    <Link
      href={InternalLink.addTransaction}
      className={buttonVariants()}
    >
      <Plus className="size-4" />
      Add transaction
    </Link>
  </section>
)
