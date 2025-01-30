import { TransactionTile } from './components/TransactionTile'
import { getUserTransactions } from './serverActions'

export const TransactionsPage = async () => {
  const { data } = await getUserTransactions({})

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
