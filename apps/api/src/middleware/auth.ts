import { createMiddleware } from 'hono/factory'
import { auth } from '~/api/lib/auth'
import type { AppBindings } from '~/api/types/app'
import { UNAUTHORIZED } from '~/api/utils/httpCodes'

export type SessionResponse = Awaited<ReturnType<typeof auth.api.getSession>>
export type SessionResponseNonNull = Exclude<SessionResponse, null>

export type User = SessionResponseNonNull['user']
export type Session = SessionResponseNonNull['session']

export type AppBindingsWithAuth = {
  Variables: {
    user: User
    session: Session
  }
} & AppBindings

export const authMiddleware = createMiddleware<AppBindingsWithAuth>(
  async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
      return c.json({ message: 'Unauthorized' }, UNAUTHORIZED)
    }

    c.set('user', session.user)
    c.set('session', session.session)

    return next()
  }
)
