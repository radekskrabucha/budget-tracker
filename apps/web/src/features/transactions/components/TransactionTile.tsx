import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { TransactionWithCategory } from '~/web/models/transaction'

export const TransactionTile: React.FC<TransactionWithCategory> = ({
  id,
  amount,
  type,
  date,
  description,
  category
}) => (
  <Link
    href={InternalLink.transactionDetails(id)}
    className="bg-card text-card-foreground border-border hover:border-primary flex items-center justify-between gap-4 rounded-lg border p-6 shadow-sm transition-colors"
  >
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="font-medium">${amount}</span>
        <span className="text-muted-foreground text-sm capitalize">{type}</span>
        {category && (
          <span className="text-muted-foreground text-sm">
            • {category.name}
          </span>
        )}
      </div>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      <p className="text-muted-foreground text-sm">{date}</p>
    </div>
    <div className="flex items-center gap-2">
      <div className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
        <span className="mr-2">See details</span>
        <ArrowRight className="text-muted-foreground size-4" />
      </div>
    </div>
  </Link>
)
