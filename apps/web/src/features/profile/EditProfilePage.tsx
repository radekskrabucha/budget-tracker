import { redirect } from 'next/navigation'
import { InternalLink } from '~/web/config/app'
import { getSession } from '~/web/features/auth/serverActions'
import { EditProfileForm } from './components/EditProfileForm'

export const EditProfilePage = async () => {
  const session = await getSession()

  if (!session) {
    return redirect(InternalLink.signIn)
  }

  return (
    <>
      <section className="layout-section">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>
        <p className="text-muted-foreground text-sm">
          Update your profile information here.
        </p>
      </section>
      <EditProfileForm name={session.user.name} />
    </>
  )
}
