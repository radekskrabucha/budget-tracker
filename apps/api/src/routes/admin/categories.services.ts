import { and, eq, isNull } from 'drizzle-orm'
import { db } from '~/api/db'
import { category } from '~/api/db/schema/category.schema'
import type {
  InsertCategory,
  UpdateCategory
} from '~/api/lib/dbZodSchema/category'

export const getAdminCategories = async () => {
  const adminCategories = await db.query.category.findMany({
    where: isNull(category.userId),
    columns: {
      userId: false
    }
  })

  return adminCategories
}

export const getAdminCategory = async (id: string) => {
  const adminCategory = await db.query.category.findFirst({
    where: and(eq(category.id, id), isNull(category.userId)),
    columns: {
      userId: false
    }
  })

  return adminCategory
}

export const createAdminCategory = async (data: InsertCategory) => {
  const [newCategory] = await db.insert(category).values(data).returning()

  if (!newCategory) {
    throw new Error('Failed to create category')
  }

  return newCategory
}

export const updateAdminCategory = async (id: string, data: UpdateCategory) => {
  const [updatedCategory] = await db
    .update(category)
    .set(data)
    .where(eq(category.id, id))
    .returning()

  return updatedCategory
}

export const deleteAdminCategory = async (id: string) => {
  const [deletedCategory] = await db
    .delete(category)
    .where(eq(category.id, id))
    .returning()

  return deletedCategory
}
