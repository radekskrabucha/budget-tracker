'use server'

import { headers } from 'next/headers'
import { appClient } from '~/web/lib/client'

export const getUserCategories = async () => {
  const res = await appClient.categories.$get(undefined, {
    headers: Object.fromEntries(await headers())
  })
  const data = await res.json()

  return data
}
