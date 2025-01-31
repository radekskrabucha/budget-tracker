import { decimalToInt } from '@budget-tracker/utils'
import { and, eq } from 'drizzle-orm'
import { db } from '~/api/db'
import { transaction } from '~/api/db/schema/transaction.schema'
import type {
  InsertTransaction,
  UpdateTransaction,
  TransactionType
} from '~/api/lib/dbZodSchema/transaction'
import {
  getPaginationParams,
  getPaginationValues
} from '~/api/utils/pagination'
import type { PaginationQuery } from '~/api/utils/schemas'

type TransactionFilters = {
  type?: TransactionType
} & PaginationQuery

export const getUserTransactions = async (
  userId: string,
  { type, ...pagination }: TransactionFilters
) => {
  const paginationValues = getPaginationValues(pagination)
  const whereClause = type
    ? and(eq(transaction.userId, userId), eq(transaction.type, type))
    : eq(transaction.userId, userId)

  const transactions = await db.query.transaction.findMany({
    where: whereClause,
    orderBy: transaction.date,
    ...getPaginationParams(paginationValues),
    with: {
      category: {
        columns: {
          createdAt: false,
          updatedAt: false,
          userId: false
        }
      }
    }
  })

  if (!paginationValues) {
    return {
      data: transactions,
      meta: undefined
    }
  }

  const total = await db.$count(transaction, whereClause)

  return {
    data: transactions,
    meta: { ...paginationValues, total }
  }
}

export const getUserTransaction = async (id: string, userId: string) => {
  const userTransaction = await db.query.transaction.findFirst({
    where: and(eq(transaction.id, id), eq(transaction.userId, userId)),
    with: {
      category: {
        columns: {
          createdAt: false,
          updatedAt: false,
          userId: false
        }
      }
    }
  })

  return userTransaction
}

export const createUserTransaction = async (
  userId: string,
  { amount, ...data }: InsertTransaction
) => {
  const [newTransaction] = await db
    .insert(transaction)
    .values({
      ...data,
      amount: decimalToInt(amount),
      userId
    })
    .returning()

  return newTransaction
}

export const updateUserTransaction = async (
  userId: string,
  id: string,
  data: UpdateTransaction
) => {
  const [updatedTransaction] = await db
    .update(transaction)
    .set(data)
    .where(and(eq(transaction.id, id), eq(transaction.userId, userId)))
    .returning()

  return updatedTransaction
}

export const deleteUserTransaction = async (userId: string, id: string) => {
  const [deletedTransaction] = await db
    .delete(transaction)
    .where(and(eq(transaction.id, id), eq(transaction.userId, userId)))
    .returning()

  return deletedTransaction
}
