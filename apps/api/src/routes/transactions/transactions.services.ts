import { and, eq } from 'drizzle-orm'
import { db } from '~/api/db'
import { transaction } from '~/api/db/schema/transaction.schema'
import type {
  InsertTransaction,
  UpdateTransaction
} from '~/api/lib/dbZodSchema/transaction'

export const getUserTransactions = async (userId: string) => {
  const transactions = await db.query.transaction.findMany({
    where: eq(transaction.userId, userId),
    orderBy: transaction.date,
    with: {
      category: true
    }
  })

  return transactions
}

export const getUserTransaction = async (id: string, userId: string) => {
  const userTransaction = await db.query.transaction.findFirst({
    where: and(eq(transaction.id, id), eq(transaction.userId, userId)),
    with: {
      category: true
    }
  })

  return userTransaction
}

export const createUserTransaction = async (
  userId: string,
  data: InsertTransaction
) => {
  const [newTransaction] = await db
    .insert(transaction)
    .values({
      ...data,
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
