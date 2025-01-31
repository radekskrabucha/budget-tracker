import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { authMiddleware } from '~/api/middleware/auth'
import type { AppBindings } from '~/api/types/app'
import { OK } from '~/api/utils/httpCodes'
import { getUserTransactionsSummary } from './dashboard.services'

const dateRangeSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional()
})

export type DateRange = z.infer<typeof dateRangeSchema>

export const dashboardRouter = new Hono<AppBindings>()
  .basePath('/dashboard')
  .use(authMiddleware)
  .get('/summary', zValidator('query', dateRangeSchema), async c => {
    const user = c.get('user')
    const query = c.req.valid('query')

    const result = await getUserTransactionsSummary(user.id, query)

    return c.json(result, OK)
  })
