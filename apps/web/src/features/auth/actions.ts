import { authClient } from '~/web/lib/auth'

const signInReq = authClient.signIn.email

type SignInReq = Pick<Parameters<typeof signInReq>[0], 'email' | 'password'>

export const signIn = (data: SignInReq) => signInReq(data)

export const signOut = authClient.signOut

const signUpReq = authClient.signUp.email

type SignUpReq = Pick<
  Parameters<typeof signUpReq>[0],
  'email' | 'password' | 'name'
>

export const signUp = (data: SignUpReq) => signUpReq(data)
