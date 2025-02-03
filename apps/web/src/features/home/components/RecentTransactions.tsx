import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { isEmpty } from '@budget-tracker/utils'
import { Wallet } from 'lucide-react'
import Link from 'next/link'
import { EmptyState } from '~/web/components/EmptyState'
import { InternalLink } from '~/web/config/app'
import { TransactionTile } from '~/web/features/transactions/components/TransactionTile'
import { getUserTransactions } from '~/web/features/transactions/serverActions'

export const RecentTransactions = async () => {
  const transactions = await getUserTransactions({
    limit: '5'
  })

  return (
    <section className="layout-section gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Recent Transactions</h2>
        <Link
          href={InternalLink.transactions}
          className={buttonVariants({ variant: 'link' })}
        >
          View all →
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {isEmpty(transactions.data) ? (
          <EmptyState
            icon={Wallet}
            title="No transactions yet"
            description="Add your first transaction to get started"
            action={
              <Link
                href={InternalLink.addTransaction}
                className={buttonVariants()}
              >
                Add transaction
              </Link>
            }
          />
        ) : (
          transactions.data.map(transaction => (
            <TransactionTile
              key={transaction.id}
              {...transaction}
            />
          ))
        )}
      </div>
    </section>
  )
}
