import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from '~/api/lib/auth'
import { notFound } from '~/api/middleware/notFound'
import { onError } from '~/api/middleware/onError'
import { pinoLogger } from '~/api/middleware/pinoLogger'
import { serveEmojiFavicon } from '~/api/middleware/serveEmojiFavicon'
import { adminRouter, appRouter } from '~/api/routes'
import type { AppBindings } from '~/api/types/app'
import { env } from '~/api/utils/env'

export const app = new Hono<AppBindings>()
  .basePath('/api')
  .use(pinoLogger())
  .use(
    '*',
    cors({
      origin: env.BETTER_AUTH_TRUSTED_ORIGINS,
      credentials: true
    })
  )
  .get('/health-check', c => c.json({ status: 'ok' }))

app.route('/', adminRouter)
app.route('/', appRouter)

app.on(['POST', 'GET'], '/auth/*', c => auth.handler(c.req.raw))

app.use('/favicon.ico', serveEmojiFavicon('💸'))

app.notFound(notFound)
app.onError(onError)

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
