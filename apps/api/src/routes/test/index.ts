import { getRandomInt } from '@budget-tracker/utils'
import { Hono } from 'hono'
import type { AppBindings } from '~/api/types/app'
import { OK } from '~/api/utils/httpCodes'

export const testRouter = new Hono<AppBindings>()
  .basePath('/test')
  .get('/random-number', c => {
    return c.json({ randomNumber: getRandomInt(1, 10) }, OK)
  })
