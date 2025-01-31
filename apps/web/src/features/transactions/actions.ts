import { fetchWrapper } from '@budget-tracker/api'
import { appClient } from '~/web/lib/client'
import { requestInitWithCredentials } from '~/web/utils/fetch'

const createUserTransactionReq = appClient.transactions.$post
type CreateUserTransactionReq = Parameters<
  typeof createUserTransactionReq
>[0]['json']

export const createUserTransaction = async (req: CreateUserTransactionReq) => {
  const data = await fetchWrapper(
    createUserTransactionReq(
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

const updateUserTransactionReq = appClient.transactions[':id'].$put
type UpdateUserTransactionReqRaw = Parameters<
  typeof updateUserTransactionReq
>[0]
type UpdateUserTransactionReqBody = UpdateUserTransactionReqRaw['json']
type UpdateUserTransactionReqParam = UpdateUserTransactionReqRaw['param']
type UpdateUserTransactionReq = UpdateUserTransactionReqBody &
  UpdateUserTransactionReqParam

export const updateUserTransaction = async ({
  id,
  ...req
}: UpdateUserTransactionReq) => {
  const data = await fetchWrapper(
    updateUserTransactionReq(
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

export const deleteUserTransaction = async (id: string) => {
  const data = await fetchWrapper(
    appClient.transactions[':id'].$delete(
      { param: { id } },
      {
        init: requestInitWithCredentials
      }
    )
  )

  return data
}
