import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { isEmpty } from '@budget-tracker/utils'
import { Wallet } from 'lucide-react'
import Link from 'next/link'
import { EmptyState } from '~/web/components/EmptyState'
import { PaginationWithMeta } from '~/web/components/PaginationWithMeta'
import { InternalLink } from '~/web/config/app'
import { TransactionType } from '~/web/models/transaction'
import { TransactionTile } from './components/TransactionTile'
import { TransactionsFilters } from './components/TransactionsFilters'
import { getUserTransactions } from './serverActions'

type TransactionsPageProps = {
  searchParams: Promise<{
    type?: TransactionType
    page?: string
  }>
}

const LIMIT = 10

export const TransactionsPage: React.FC<TransactionsPageProps> = async ({
  searchParams
}) => {
  const query = await searchParams
  const { data, meta } = await getUserTransactions({
    type: query.type,
    page: query.page,
    limit: LIMIT.toString()
  })

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
    <>
      <TransactionsFilters type={query.type} />
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
      <section className="layout-section">
        <PaginationWithMeta
          {...meta}
          getQuery={page => {
            if (!query.type) {
              return { page: page.toString() } as Record<string, string>
            }
            return {
              page: page.toString(),
              type: query.type
            }
          }}
        />
      </section>
    </>
  )
}
