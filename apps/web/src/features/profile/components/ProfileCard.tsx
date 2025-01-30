import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Mail, Pencil, User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { InternalLink } from '~/web/config/app'
import { getSession } from '~/web/features/signIn/serverActions'
import { ProfileField } from './ProfileField'

export const ProfileCard = async () => {
  const session = await getSession()

  if (!session) {
    return redirect(InternalLink.signIn)
  }

  return (
    <section className="layout-section">
      <div className="bg-card text-card-foreground border-border rounded-lg border p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <ProfileField
              icon={User}
              label="Name"
              value={session.user.name}
            />
            <ProfileField
              icon={Mail}
              label="Email"
              value={session.user.email}
            />
          </div>
          <Link
            href={InternalLink.editProfile}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <Pencil className="text-muted-foreground size-4" />
            <span className="sr-only">Edit profile</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
