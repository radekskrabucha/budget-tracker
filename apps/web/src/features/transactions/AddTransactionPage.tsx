import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Label } from '@budget-tracker/ui/components/ui/label'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { getUserCombinedCategories } from '~/web/features/categories/serverActions'
import { TransactionType } from '~/web/models/transaction'
import { AddTransactionForm } from './components/AddTransactionForm'

type AddTransactionPageProps = {
  searchParams: Promise<{
    type?: TransactionType
  }>
}

export const AddTransactionPage: React.FC<AddTransactionPageProps> = async ({
  searchParams
}) => {
  const query = await searchParams
  const type = query.type ?? 'expense'
  const data = await getUserCombinedCategories({ type })

  return (
    <>
      <section className="layout-section">
        <h2 className="text-2xl font-semibold">Add transaction</h2>
        <p className="text-muted-foreground text-sm">
          Add a new transaction to track your income or expenses.
        </p>
      </section>
      <section className="layout-section gap-4">
        <Label>Transaction type</Label>
        <div className="flex gap-2">
          <Link
            href={{
              pathname: InternalLink.addTransaction,
              query: { type: 'expense' }
            }}
            className={buttonVariants({
              variant: type === 'expense' ? 'default' : 'outline'
            })}
          >
            Expense
          </Link>
          <Link
            href={{
              pathname: InternalLink.addTransaction,
              query: { type: 'income' }
            }}
            className={buttonVariants({
              variant: type === 'income' ? 'default' : 'outline'
            })}
          >
            Income
          </Link>
        </div>
      </section>
      <AddTransactionForm
        categories={data.categories}
        type={type}
      />
    </>
  )
}
