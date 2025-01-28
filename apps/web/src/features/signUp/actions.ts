import { authClient } from '~/web/lib/auth'

const signUpReq = authClient.signUp.email

type SignUpReq = Pick<
  Parameters<typeof signUpReq>[0],
  'email' | 'password' | 'name'
>

export const signUp = (data: SignUpReq) => signUpReq(data)
