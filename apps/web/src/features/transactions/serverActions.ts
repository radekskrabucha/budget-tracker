'use server'

import { ApiError, fetchWrapper } from '@budget-tracker/api'
import { appClient } from '~/web/lib/client'
import { getHeaders } from '~/web/utils/headers'

const getUserTransactionsReq = appClient.transactions.$get
type GetUserTransactionsReq = Parameters<
  typeof getUserTransactionsReq
>[0]['query']

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

const getUserTransactionReq = appClient.transactions[':id'].$get
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
