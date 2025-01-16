import { getRandomInt } from '@budget-tracker/utils'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { notFound } from '~/api/middleware/notFound'
import { onError } from '~/api/middleware/onError'
import { pinoLogger } from '~/api/middleware/pinoLogger'
import { serveEmojiFavicon } from '~/api/middleware/serveEmojiFavicon'
import type { AppBindings } from '~/api/types/app'
import { env } from '~/api/utils/env'

export const app = new Hono<AppBindings>()
  .use(pinoLogger())
  .get('/', c => {
    return c.text('Hello Hono!')
  })
  .get('/random-number', c => {
    return c.json({ randomNumber: getRandomInt(1, 10) })
  })

app.use(serveEmojiFavicon('💸'))
app.notFound(notFound)
app.onError(onError)

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
