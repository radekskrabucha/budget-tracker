import { appClient } from '~/web/lib/client'
import { getHeaders } from '~/web/utils/headers'

export const deleteCategory = async (id: string) => {
  const res = await appClient.categories[':id'].$delete(
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

const createCategoryReq = appClient.categories.$post
type CreateCategoryReq = Parameters<typeof createCategoryReq>[0]['json']

export const createCategory = async (req: CreateCategoryReq) => {
  const res = await createCategoryReq(
    {
      json: req
    },
    {
      headers: await getHeaders()
    }
  )
  const data = await res.json()

  return data
}

const updateCategoryReq = appClient.categories[':id'].$put
type UpdateCategoryReq = Parameters<typeof updateCategoryReq>[0]['json']

export const updateCategory = async (id: string, req: UpdateCategoryReq) => {
  const res = await updateCategoryReq(
    {
      param: { id },
      json: req
    },
    {
      headers: await getHeaders()
    }
  )
  const data = await res.json()

  return data
}
