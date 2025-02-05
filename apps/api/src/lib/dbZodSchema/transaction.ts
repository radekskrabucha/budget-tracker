import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { transaction } from '~/api/db/schema/transaction.schema'

export const insertTransactionSchema = createInsertSchema(transaction, {
  categoryId: schema => schema.uuid()
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    date: true,
    amount: true
  })
  .extend({
    date: z.coerce.date(),
    amount: z.number()
  })
export const updateTransactionSchema = insertTransactionSchema.partial()
export const selectTransactionSchema = createSelectSchema(transaction).omit({
  userId: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true
})

export const selectTransactionTypeSchema = selectTransactionSchema.pick({
  type: true
})

export type InsertTransaction = z.infer<typeof insertTransactionSchema>
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>
export type SelectTransaction = z.infer<typeof selectTransactionSchema>
export type SelectTransactionType = z.infer<typeof selectTransactionTypeSchema>
export type TransactionType = SelectTransaction['type']
