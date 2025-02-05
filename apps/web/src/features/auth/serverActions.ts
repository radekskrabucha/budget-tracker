'use server'

import { headers } from 'next/headers'
import { authClient } from '~/web/lib/auth'

export const getSession = async () => {
  try {
    return await authClient.getSession({
      fetchOptions: {
        headers: await headers()
      }
    })
  } catch {
    return null
  }
}
