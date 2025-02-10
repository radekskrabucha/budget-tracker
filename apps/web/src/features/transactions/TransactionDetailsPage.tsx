import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Edit2 } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { TransactionDeleteButton } from './components/TransactionDeleteButton'
import { TransactionDetails } from './components/TransactionDetails'

type TransactionDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

export const TransactionDetailsPage: React.FC<
  TransactionDetailsPageProps
> = async ({ params }) => {
  const { id } = await params

  return (
    <>
      <section className="layout-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">Transaction Details</h2>
            <p className="text-muted-foreground text-sm">
              View and manage your transaction
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={InternalLink.editTransaction(id)}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Link>
            <TransactionDeleteButton id={id} />
          </div>
        </div>
      </section>
      <TransactionDetails id={id} />
    </>
  )
}
