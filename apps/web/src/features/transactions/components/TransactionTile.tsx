import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { cx } from 'class-variance-authority'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import type { TransactionWithCategory } from '~/web/models/transaction'
import { formatAmount } from '~/web/utils/currency'

export const TransactionTile: React.FC<TransactionWithCategory> = ({
  id,
  amount,
  type,
  date,
  category,
  description
}) => (
  <Link
    href={InternalLink.transactionDetails(id)}
    className={cx(
      'border-border bg-card flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-colors max-md:flex-col max-md:items-stretch',
      type === 'expense' ? 'hover:border-destructive' : 'hover:border-primary'
    )}
  >
    <div className="flex flex-1 items-center gap-4 max-md:flex-col max-md:items-start">
      <div className="flex flex-col">
        <span className="text-muted-foreground text-sm capitalize">{type}</span>
        <span
          className={`font-medium ${type === 'expense' ? 'text-destructive' : 'text-primary'}`}
        >
          {formatAmount(amount)}
        </span>
      </div>
      <div className="flex flex-col">
        {category && (
          <span className="text-muted-foreground font-bold">
            {category.name}
          </span>
        )}
        {description && (
          <span className="text-muted-foreground line-clamp-1 text-xs">
            {description}
          </span>
        )}
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 max-md:justify-between">
      <div className="text-muted-foreground text-sm">{format(date, 'PPP')}</div>
      <div className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
        <span className="mr-2">Details</span>
        <ArrowRight className="size-4" />
      </div>
    </div>
  </Link>
)
