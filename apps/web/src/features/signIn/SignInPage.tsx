import { SignInForm } from './components/SignInForm'

export const SignInPage = () => (
  <div className="layout-section flex-1 justify-center items-center gap-10">
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="text-muted-foreground">
        Enter your email and password to sign in
      </p>
    </div>
    <SignInForm />
  </div>
)
