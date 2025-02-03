import { intToDecimal } from '@budget-tracker/utils'
import { and, eq, sql } from 'drizzle-orm'
import { db } from '~/api/db'
import { transaction } from '~/api/db/schema/transaction.schema'
import type { DateRange } from './index'

export const getUserTransactionsSummary = async (
  userId: string,
  range: DateRange
) => {
  const whereClause = and(
    eq(transaction.userId, userId),
    ...(range.startDate
      ? [sql`${transaction.date} >= ${range.startDate}`]
      : []),
    ...(range.endDate ? [sql`${transaction.date} <= ${range.endDate}`] : [])
  )

  const [result] = await db
    .select({
      income: sql<number>`COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0)`,
      expense: sql<number>`COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0)`
    })
    .from(transaction)
    .where(whereClause)

  const income = result ? intToDecimal(result.income) : 0
  const expense = result ? intToDecimal(result.expense) : 0
  const balance = income - expense

  return {
    income,
    expense,
    balance,
    ...(range.startDate && { startDate: range.startDate }),
    ...(range.endDate && { endDate: range.endDate })
  }
}
