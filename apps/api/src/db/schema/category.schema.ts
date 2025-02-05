import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth.schema'
import { transaction } from './transaction.schema'

export const categoryTypeEnum = pgEnum('category_type', [
  'income',
  'expense'
])

export const category = pgTable('category', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: categoryTypeEnum('type'),
  userId: uuid('user_id').references(() => user.id, {
    onDelete: 'cascade'
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const categoryRelations = relations(category, ({ many, one }) => ({
  transactions: many(transaction),
  user: one(user, {
    fields: [category.userId],
    references: [user.id]
  })
}))
