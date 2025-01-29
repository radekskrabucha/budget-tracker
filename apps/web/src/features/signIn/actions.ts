import { authClient } from '~/web/lib/auth'

const signInReq = authClient.signIn.email

type SignInReq = Pick<Parameters<typeof signInReq>[0], 'email' | 'password'>

export const signIn = (data: SignInReq) => signInReq(data)

export const signOut = authClient.signOut
