import { getUserCombinedCategories } from '~/web/features/categories/serverActions'
import { EditTransactionForm } from './components/EditTransactionForm'
import { getUserTransaction } from './serverActions'

type EditTransactionPagePageProps = {
  params: Promise<{
    id: string
  }>
}

export const EditTransactionPage: React.FC<
  EditTransactionPagePageProps
> = async ({ params }) => {
  const { id } = await params

  const data = await getUserTransaction({ id })

  if (!data) {
    return <div>Transaction not found</div>
  }

  const categoriesData = await getUserCombinedCategories()

  return (
    <>
      <EditTransactionForm
        id={id}
        transaction={data.transaction}
        categories={categoriesData.categories}
      />
    </>
  )
}
