import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import type { TransactionType } from '~/web/models/transaction'

type TransactionsFiltersProps = {
  type: TransactionType | undefined
}

export const TransactionsFilters: React.FC<TransactionsFiltersProps> = ({
  type
}) => (
  <section className="layout-section !flex-row flex-wrap items-center justify-end gap-4">
    <span className="text-muted-foreground text-sm">Filter by:</span>
    <FilterButton
      type="expense"
      selectedType={type}
    />
    <FilterButton
      type="income"
      selectedType={type}
    />
  </section>
)

type FilterButtonProps = {
  type: TransactionType
  selectedType: TransactionType | undefined
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, selectedType }) => {
  const isSelected = selectedType === type

  return (
    <Link
      href={{
        pathname: InternalLink.transactions,
        query: isSelected ? undefined : { type }
      }}
      className={buttonVariants({
        variant: isSelected ? 'default' : 'outline',
        className: 'capitalize'
      })}
    >
      {type}
    </Link>
  )
}
