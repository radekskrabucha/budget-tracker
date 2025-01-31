'use server'

import { ApiError, fetchWrapper } from '@budget-tracker/api'
import { appClient } from '~/web/lib/client'
import { getHeaders } from '~/web/utils/headers'

export const getUserCategories = async () => {
  const data = await fetchWrapper(
    appClient.categories.$get(undefined, {
      headers: await getHeaders()
    })
  )

  return data
}

export const getUserCategory = async (id: string) => {
  try {
    const data = await fetchWrapper(
      appClient.categories[':id'].$get(
        {
          param: { id }
        },
        {
          headers: await getHeaders()
        }
      )
    )

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        return undefined
      }
    }

    throw error
  }
}

export const getUserCombinedCategories = async () => {
  const data = await fetchWrapper(
    appClient.categories.combined.$get(undefined, {
      headers: await getHeaders()
    })
  )

  return data
}
