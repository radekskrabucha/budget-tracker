import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { isEmpty } from '@budget-tracker/utils'
import { Wallet } from 'lucide-react'
import Link from 'next/link'
import { EmptyState } from '~/web/components/EmptyState'
import { InternalLink } from '~/web/config/app'
import { TransactionTile } from './components/TransactionTile'
import { getUserTransactions } from './serverActions'

export const TransactionsPage = async () => {
  const { data } = await getUserTransactions({})

  if (isEmpty(data)) {
    return (
      <section className="layout-section">
        <EmptyState
          icon={Wallet}
          title="No transactions yet"
          description="Start tracking your income and expenses by adding your first transaction."
          action={
            <Link
              href={InternalLink.addTransaction}
              className={buttonVariants()}
            >
              Add transaction
            </Link>
          }
        />
      </section>
    )
  }

  return (
    <section className="layout-section">
      <div className="flex flex-col gap-4">
        {data.map(transaction => (
          <TransactionTile
            key={transaction.id}
            {...transaction}
          />
        ))}
      </div>
    </section>
  )
}
