import { getRandomInt } from '@budget-tracker/utils'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { notFound } from '~/api/middleware/notFound'
import { serveEmojiFavicon } from '~/api/middleware/serveEmojiFavicon'

export const app = new Hono()
  .get('/', c => {
    return c.text('Hello Hono!')
  })
  .get('/random-number', c => {
    return c.json({ randomNumber: getRandomInt(1, 10) })
  })

app.use(serveEmojiFavicon('💸'))
app.notFound(notFound)

const port = 3001
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
