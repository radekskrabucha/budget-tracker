import { fetchWrapper } from '@budget-tracker/api'
import { appClient } from '~/web/lib/client'
import { requestInitWithCredentials } from '~/web/utils/fetch'

export const deleteCategory = async (id: string) => {
  const data = await fetchWrapper(
    appClient.categories[':id'].$delete(
      {
        param: { id }
      },
      {
        init: requestInitWithCredentials
      }
    )
  )

  return data
}

const createCategoryReq = appClient.categories.$post
type CreateCategoryReq = Parameters<typeof createCategoryReq>[0]['json']

export const createCategory = async (req: CreateCategoryReq) => {
  const data = await fetchWrapper(
    createCategoryReq(
      {
        json: req
      },
      {
        init: requestInitWithCredentials
      }
    )
  )

  return data
}

const updateCategoryReq = appClient.categories[':id'].$put
type UpdateCategoryReq = Parameters<typeof updateCategoryReq>[0]['json'] & {
  id: string
}

export const updateCategory = async ({ id, ...req }: UpdateCategoryReq) => {
  const data = await fetchWrapper(
    updateCategoryReq(
      {
        param: { id },
        json: req
      },
      {
        init: requestInitWithCredentials
      }
    )
  )

  return data
}
