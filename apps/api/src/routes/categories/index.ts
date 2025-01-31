import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import {
  insertCategorySchema,
  updateCategorySchema
} from '~/api/lib/dbZodSchema/category'
import { authMiddleware } from '~/api/middleware/auth'
import type { AppBindings } from '~/api/types/app'
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '~/api/utils/httpCodes'
import {
  createUserCategory,
  deleteUserCategory,
  getCombinedCategories,
  getUserCategories,
  getUserCategory,
  updateUserCategory
} from './categories.services'

export const categoriesRouter = new Hono<AppBindings>()
  .basePath('/categories')
  .use(authMiddleware)
  .get('/', async c => {
    const user = c.get('user')
    const categories = await getUserCategories(user.id)

    return c.json({ categories }, OK)
  })
  .get('/combined', async c => {
    const user = c.get('user')
    const { search } = c.req.query()

    const categories = await getCombinedCategories(user.id, search)

    return c.json({ categories }, OK)
  })
  .get('/:id', async c => {
    const user = c.get('user')
    const { id } = c.req.param()

    const category = await getUserCategory(user.id, id)

    if (!category) {
      return c.json({ message: 'Category not found' }, NOT_FOUND)
    }

    return c.json({ category }, OK)
  })
  .post('/', zValidator('json', insertCategorySchema), async c => {
    const user = c.get('user')
    const data = await c.req.valid('json')

    const category = await createUserCategory(user.id, data)

    if (!category) {
      return c.json({ message: 'Failed to create category' }, BAD_REQUEST)
    }

    return c.json({ category }, CREATED)
  })
  .put('/:id', zValidator('json', updateCategorySchema), async c => {
    const user = c.get('user')
    const { id } = c.req.param()
    const data = await c.req.valid('json')

    const category = await updateUserCategory(user.id, id, data)

    if (!category) {
      return c.json({ message: 'Category not found' }, NOT_FOUND)
    }

    return c.json({ category }, OK)
  })
  .delete('/:id', async c => {
    const user = c.get('user')
    const { id } = c.req.param()

    const category = await deleteUserCategory(user.id, id)

    if (!category) {
      return c.json({ message: 'Category not found' }, NOT_FOUND)
    }

    return c.json({ category }, OK)
  })
