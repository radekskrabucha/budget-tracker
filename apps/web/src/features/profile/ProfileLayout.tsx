import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { ProfileOptions } from './components/ProfileOptions'

export const ProfileLayout = ({ children }: React.PropsWithChildren) => (
  <>
    <div className="layout-section">
      <div className="flex items-center justify-between">
        <Link
          href={InternalLink.profile}
          className="text-2xl font-semibold"
        >
          Profile
        </Link>
        <ProfileOptions />
      </div>
    </div>
    {children}
  </>
)
