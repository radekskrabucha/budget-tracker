import { getUserCombinedCategories } from '~/web/features/categories/serverActions'
import { AddTransactionForm } from './components/AddTransactionForm'

export const AddTransactionPage = async () => {
  const data = await getUserCombinedCategories()

  return (
    <>
      <section className="layout-section">
        <h2 className="text-2xl font-semibold">Add transaction</h2>
        <p className="text-muted-foreground text-sm">
          Add a new transaction to track your income or expenses.
        </p>
      </section>
      <AddTransactionForm categories={data.categories} />
    </>
  )
}
