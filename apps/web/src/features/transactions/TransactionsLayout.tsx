import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'

export const TransactionsLayout = ({ children }: React.PropsWithChildren) => (
  <>
    <div className="layout-section">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={InternalLink.transactions}
          className="text-2xl font-semibold"
        >
          Your transactions
        </Link>
        <Link
          href={InternalLink.addTransaction}
          className={buttonVariants()}
        >
          <Plus className="size-4" />
          Add new transaction
        </Link>
      </div>
    </div>
    {children}
  </>
)
