'use server'

import { ApiError, fetchWrapper, InferRequestType, InferResponseType } from '@budget-tracker/api'
import { appClient } from '~/web/lib/client'
import { getHeaders } from '~/web/utils/headers'

const getUserTransactionsReq = appClient.transactions.$get
type GetUserTransactionsReq = InferRequestType<
  typeof getUserTransactionsReq
>['query']

export type GetUserTransactionsRes = InferResponseType<
  typeof getUserTransactionsReq
>

export const getUserTransactions = async (req: GetUserTransactionsReq) => {
  const data = await fetchWrapper(
    getUserTransactionsReq(
      {
        query: req
      },
      {
        headers: await getHeaders()
      }
    )
  )

  return data
}

export const getUserTransactionReq = appClient.transactions[':id'].$get
type GetUserTransactionReq = Parameters<
  typeof getUserTransactionReq
>[0]['param']

export const getUserTransaction = async (req: GetUserTransactionReq) => {
  try {
    const data = await fetchWrapper(
      getUserTransactionReq(
        {
          param: req
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
