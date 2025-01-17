import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { category } from '~/api/db/schema/category.schema'

export const insertCategorySchema = createInsertSchema(category, {
  name: schema => schema.min(1).max(256),
  description: schema => schema.min(1).max(256)
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true
})

export type InsertCategory = z.infer<typeof insertCategorySchema>

export const updateCategorySchema = insertCategorySchema.partial()

export type UpdateCategory = z.infer<typeof updateCategorySchema>
