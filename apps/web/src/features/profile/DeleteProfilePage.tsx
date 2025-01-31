import { DeleteProfileForm } from './components/DeleteProfileForm'

export const DeleteProfilePage = () => (
  <>
    <section className="layout-section">
      <h2 className="text-destructive text-2xl font-semibold">
        Delete Profile
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-muted-foreground">
          Are you absolutely sure you want to delete your profile? This action
          cannot be undone. This will permanently delete your account and remove
          your data from our servers.
        </p>
        <div className="text-muted-foreground bg-muted/50 rounded-md p-4">
          <p className="font-medium">This will:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Delete your account permanently</li>
            <li>Remove all your personal information</li>
            <li>Delete all your transactions and categories</li>
            <li>Log you out of all devices</li>
          </ul>
        </div>
      </div>
    </section>
    <DeleteProfileForm />
  </>
)
