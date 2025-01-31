import { getNow } from '@budget-tracker/utils'
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns'
import { SummaryChart } from './SummaryChart'
import { SummaryTile } from './SummaryTile'

const today = getNow()

export const SummarySection = () => (
  <section className="layout-section">
    <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      <SummaryTile
        title="Total Balance"
        description="Of all your transactions"
      />
      <SummaryChart
        title="This Week"
        description="Sum of all your transactions this week"
        startDate={startOfWeek(today)}
        endDate={endOfWeek(today)}
      />
      <SummaryChart
        title="This Month"
        description="Sum of all your transactions this month"
        startDate={startOfMonth(today)}
        endDate={endOfMonth(today)}
      />
    </div>
  </section>
)
