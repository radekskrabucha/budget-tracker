import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { envClient } from '~/web/utils/env/client'

export const authClient = createAuthClient({
  plugins: [adminClient()],
  baseURL: envClient.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    throw: true
  }
})
