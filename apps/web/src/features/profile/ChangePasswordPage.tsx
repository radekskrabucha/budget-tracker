import { ChangePasswordForm } from './components/ChangePasswordForm'

export const ChangePasswordPage = () => (
  <>
    <section className="layout-section">
      <h2 className="text-2xl font-semibold">Change Password</h2>
      <p className="text-muted-foreground text-sm">
        Update your password here.
      </p>
    </section>
    <ChangePasswordForm />
  </>
)
