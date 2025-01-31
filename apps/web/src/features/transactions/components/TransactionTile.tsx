import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { cx } from 'class-variance-authority'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { TransactionWithCategory } from '~/web/models/transaction'

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
      'border-border bg-card flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-colors',
      type === 'expense' ? 'hover:border-destructive' : 'hover:border-primary'
    )}
  >
    <div className="flex flex-1 items-center gap-4">
      <div className="flex flex-col">
        <span className="text-muted-foreground text-sm capitalize">{type}</span>
        <span
          className={`font-medium ${type === 'expense' ? 'text-destructive' : 'text-primary'}`}
        >
          ${amount}
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
    <div className="text-muted-foreground text-sm">{format(date, 'PPP')}</div>
    <div className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
      <span className="mr-2">Details</span>
      <ArrowRight className="size-4" />
    </div>
  </Link>
)
