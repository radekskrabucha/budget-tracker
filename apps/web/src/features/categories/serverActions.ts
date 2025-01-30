'use server'

import { appClient } from '~/web/lib/client'
import { getHeaders } from '~/web/utils/headers'

export const getUserCategories = async () => {
  const res = await appClient.categories.$get(undefined, {
    headers: await getHeaders()
  })
  const data = await res.json()

  return data
}

export const getUserCategory = async (id: string) => {
  const res = await appClient.categories[':id'].$get(
    {
      param: { id }
    },
    {
      headers: await getHeaders()
    }
  )
  const data = await res.json()

  return data
}
