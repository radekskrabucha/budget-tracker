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

  return (
    <>
      <EditTransactionForm
        id={id}
        transaction={data.transaction}
      />
    </>
  )
}
