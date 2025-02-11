'use client'

import {
  type ChartConfig,
  ChartContainer
} from '@budget-tracker/ui/components/ui/chart'
import { Pie, PieChart } from 'recharts'

type ChartData = {
  type: string
  value: number
  fill: string
}

const chartConfig = {
  income: {
    label: 'Income'
  },
  expense: {
    label: 'Expenses'
  }
} satisfies ChartConfig

type PieChartProps = {
  data: Array<ChartData>
}

export const Chart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="type"
        />
      </PieChart>
    </ChartContainer>
  )
}
