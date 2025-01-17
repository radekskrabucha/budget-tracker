import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
  pgEnum
} from 'drizzle-orm/pg-core'
import { user } from './auth.schema'
import { category } from './category.schema'

export const transactionTypeEnum = pgEnum('transaction_type', [
  'income',
  'expense'
])

export const transaction = pgTable('transaction', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade'
    }),
  categoryId: uuid('category_id').references(() => category.id, {
    onDelete: 'set null'
  }),
  amount: numeric('amount').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  type: transactionTypeEnum('type').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const transactionRelations = relations(transaction, ({ one }) => ({
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id]
  }),
  user: one(user, {
    fields: [transaction.userId],
    references: [user.id]
  })
}))
