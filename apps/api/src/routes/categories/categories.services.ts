import { and, eq, ilike, isNull, or } from 'drizzle-orm'
import { db } from '~/api/db'
import { category } from '~/api/db/schema/category.schema'
import type {
  InsertCategory,
  UpdateCategory
} from '~/api/lib/dbZodSchema/category'

export const getUserCategories = async (userId: string) => {
  const userCategories = await db.query.category.findMany({
    where: eq(category.userId, userId),
    orderBy: (category, { asc }) => [asc(category.name)],
    columns: {
      createdAt: false,
      updatedAt: false,
      userId: false
    }
  })

  return userCategories
}

export const getUserCategory = async (userId: string, id: string) => {
  const userCategory = await db.query.category.findFirst({
    where: and(eq(category.id, id), eq(category.userId, userId)),
    columns: {
      createdAt: false,
      updatedAt: false,
      userId: false
    }
  })

  return userCategory
}

export const createUserCategory = async (
  userId: string,
  data: InsertCategory
) => {
  const [newCategory] = await db
    .insert(category)
    .values({
      ...data,
      userId
    })
    .returning()

  return newCategory
}

export const updateUserCategory = async (
  userId: string,
  id: string,
  data: UpdateCategory
) => {
  const [updatedCategory] = await db
    .update(category)
    .set(data)
    .where(and(eq(category.id, id), eq(category.userId, userId)))
    .returning()

  return updatedCategory
}

export const deleteUserCategory = async (userId: string, id: string) => {
  const [deletedCategory] = await db
    .delete(category)
    .where(and(eq(category.id, id), eq(category.userId, userId)))
    .returning()

  return deletedCategory
}

export const getCombinedCategories = async (
  userId: string,
  search?: string
) => {
  const whereClause = search
    ? or(
        and(eq(category.userId, userId), ilike(category.name, `%${search}%`)),
        and(isNull(category.userId), ilike(category.name, `%${search}%`))
      )
    : or(eq(category.userId, userId), isNull(category.userId))

  const categories = await db.query.category.findMany({
    where: whereClause,
    orderBy: (category, { asc }) => [asc(category.name)],
    columns: {
      createdAt: false,
      updatedAt: false,
      userId: false
    }
  })

  return categories
}
