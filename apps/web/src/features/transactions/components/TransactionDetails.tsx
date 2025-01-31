import { format } from 'date-fns'
import { redirect } from 'next/navigation'
import { InternalLink } from '~/web/config/app'
import { getUserTransaction } from '../serverActions'

type TransactionDetailsProps = {
  id: string
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = async ({
  id
}) => {
  const data = await getUserTransaction({ id })

  if (!data) {
    throw redirect(InternalLink.transactions)
  }

  const {
    transaction: { amount, date, description, type, category }
  } = data

  return (
    <section className="layout-section gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium">
            Type
          </span>
          <span className="capitalize">{type}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium">
            Amount
          </span>
          <span
            className={type === 'expense' ? 'text-destructive' : 'text-primary'}
          >
            ${amount}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium">
            Date
          </span>
          <span>{format(date, 'PPP')}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium">
            Category
          </span>
          <span>{category?.name}</span>
        </div>
      </div>
      {description && (
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium">
            Description
          </span>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}
    </section>
  )
}
