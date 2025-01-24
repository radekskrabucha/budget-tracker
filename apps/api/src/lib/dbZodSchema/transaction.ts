import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { transaction } from '~/api/db/schema/transaction.schema'

export const insertTransactionSchema = createInsertSchema(transaction, {
  categoryId: schema => schema.uuid()
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true
})
export const updateTransactionSchema = insertTransactionSchema.partial()
export const selectTransactionSchema = createSelectSchema(transaction).omit({
  userId: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true
})

export type InsertTransaction = z.infer<typeof insertTransactionSchema>
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>
export type SelectTransaction = z.infer<typeof selectTransactionSchema>
export type SelectTransactionType = SelectTransaction['type']
