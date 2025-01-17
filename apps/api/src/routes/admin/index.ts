import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import {
  insertCategorySchema,
  updateCategorySchema
} from '~/api/lib/dbZodSchema/category'
import { adminMiddleware } from '~/api/middleware/admin'
import { authMiddleware } from '~/api/middleware/auth'
import type { AppBindings } from '~/api/types/app'
import { CREATED, NOT_FOUND, OK } from '~/api/utils/httpCodes'
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  getAdminCategory,
  updateAdminCategory
} from './categories.services'

export const adminRouter = new Hono<AppBindings>()
  .use(authMiddleware)
  .use(adminMiddleware)
  .get('/', async c => {
    const categories = await getAdminCategories()

    return c.json({ categories }, OK)
  })
  .get('/:id', async c => {
    const { id } = c.req.param()

    const category = await getAdminCategory(id)

    if (!category) {
      return c.json({ message: 'Category not found' }, NOT_FOUND)
    }

    return c.json({ category })
  })
  .post('/', zValidator('json', insertCategorySchema), async c => {
    const data = await c.req.valid('json')

    const category = await createAdminCategory(data)

    return c.json({ category }, CREATED)
  })
  .put('/:id', zValidator('json', updateCategorySchema), async c => {
    const { id } = c.req.param()
    const data = await c.req.valid('json')

    const category = await updateAdminCategory(id, data)

    if (!category) {
      return c.json({ message: 'Category not found' }, NOT_FOUND)
    }

    return c.json({ category }, OK)
  })
  .delete('/:id', async c => {
    const { id } = c.req.param()

    const category = await deleteAdminCategory(id)

    if (!category) {
      return c.json({ message: 'Category not found' }, NOT_FOUND)
    }

    return c.json({ category }, OK)
  })
