import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@budget-tracker/ui/components/ui/card'
import { formatAmount } from '~/web/utils/currency'
import { getUserDashboardSummary } from '../serverActions'
import { Chart } from './PieChart'

type SummaryChartProps = {
  title: string
  description?: string
  startDate?: Date
  endDate?: Date
}

export const SummaryChart: React.FC<SummaryChartProps> = async ({
  title,
  description,
  startDate,
  endDate
}) => {
  const { balance, income, expense } = await getUserDashboardSummary({
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : undefined
  })

  const chartData = [
    { type: 'Income', value: income, fill: 'hsl(var(--primary))' },
    { type: 'Expenses', value: expense, fill: 'hsl(var(--destructive))' }
  ]

  return (
    <Card className="max-lg:col-span-full">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="font-semibold">
        <Chart data={chartData} />
        <p className="text-2xl">
          Balance: <span className="font-bold">{formatAmount(balance)}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4">
          <span>
            Income:{' '}
            <span className="text-primary font-bold">
              {formatAmount(income)}
            </span>
          </span>
          <span>
            Expenses:{' '}
            <span className="text-destructive font-bold">
              {formatAmount(expense)}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
