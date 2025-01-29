import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { SignUpForm } from './components/SignUpForm'

export const SignUpPage = () => (
  <div className="layout-section flex-1 items-center justify-center gap-10">
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <p className="text-muted-foreground">
        Enter your information to get started
      </p>
    </div>
    <SignUpForm />
    <p className="text-muted-foreground text-sm">
      Already have an account?{' '}
      <Link
        href={InternalLink.signIn}
        className="text-primary hover:underline"
      >
        Sign in
      </Link>
    </p>
  </div>
)
