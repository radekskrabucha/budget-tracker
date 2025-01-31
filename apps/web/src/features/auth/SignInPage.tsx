import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { SignInForm } from './components/SignInForm'

export const SignInPage = () => (
  <div className="layout-section-auth flex-1 items-center justify-center gap-10">
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="text-muted-foreground">
        Enter your email and password to sign in
      </p>
    </div>
    <SignInForm />
    <p className="text-muted-foreground text-sm">
      Don&apos;t have an account?{' '}
      <Link
        href={InternalLink.signUp}
        className="text-primary hover:underline"
      >
        Sign up
      </Link>
    </p>
  </div>
)
