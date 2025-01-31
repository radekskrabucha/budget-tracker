import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@budget-tracker/ui/components/ui/card'
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
    { type: 'Expense', value: expense, fill: 'hsl(var(--destructive))' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Chart data={chartData} />
        <div className="text-muted-foreground flex items-center gap-x-4 font-medium">
          <p>
            Income <span className="text-primary font-semibold">${income}</span>
          </p>
          <p>
            Expense{' '}
            <span className="text-destructive font-semibold">${expense}</span>
          </p>
        </div>
        <p className="text-muted-foreground text-lg font-medium">
          Balance{' '}
          <span className="text-card-foreground font-bold">${balance}</span>
        </p>
      </CardContent>
    </Card>
  )
}
