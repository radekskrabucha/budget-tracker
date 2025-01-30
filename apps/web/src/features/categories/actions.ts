import { appClient } from '~/web/lib/client'

const init = {
  credentials: 'include',
  mode: 'cors'
} satisfies RequestInit

export const deleteCategory = async (id: string) => {
  const res = await appClient.categories[':id'].$delete(
    {
      param: { id }
    },
    {
      init
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
      init
    }
  )
  const data = await res.json()

  return data
}

const updateCategoryReq = appClient.categories[':id'].$put
type UpdateCategoryReq = Parameters<typeof updateCategoryReq>[0]['json'] & {
  id: string
}

export const updateCategory = async ({ id, ...req }: UpdateCategoryReq) => {
  const res = await updateCategoryReq(
    {
      param: { id },
      json: req
    },
    {
      init
    }
  )
  const data = await res.json()

  return data
}
