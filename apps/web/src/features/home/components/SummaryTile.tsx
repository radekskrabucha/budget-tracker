import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@budget-tracker/ui/components/ui/card'
import { formatAmount } from '~/web/utils/currency'
import { getUserDashboardSummary } from '../serverActions'

type SummaryTileProps = {
  title: string
  description?: string
  startDate?: Date
  endDate?: Date
}

export const SummaryTile: React.FC<SummaryTileProps> = async ({
  title,
  description,
  startDate,
  endDate
}) => {
  const { balance, income, expense } = await getUserDashboardSummary({
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : undefined
  })

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatAmount(balance)}</p>
        <div className="mt-4 flex flex-wrap gap-x-4">
          <span>
            Income:{' '}
            <span className="text-primary font-semibold">
              {formatAmount(income)}
            </span>
          </span>
          <span>
            Expenses:{' '}
            <span className="text-destructive font-semibold">
              {formatAmount(expense)}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
