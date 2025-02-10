import { ProfileCard } from './components/ProfileCard'
import { SignOutButton } from './components/SignOutButton'

export const ProfilePage = () => (
  <>
    <ProfileCard />
    <section className="layout-section items-start">
      <SignOutButton />
    </section>
  </>
)
