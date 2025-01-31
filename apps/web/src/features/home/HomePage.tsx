import { HeaderSection } from './components/HeaderSection'
import { RecentTransactions } from './components/RecentTransactions'
import { SummarySection } from './components/SummarySection'

export const HomePage = () => (
  <>
    <HeaderSection />
    <SummarySection />
    <RecentTransactions />
  </>
)
