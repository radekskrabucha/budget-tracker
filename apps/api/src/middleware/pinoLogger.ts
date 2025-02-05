import { pinoLogger as logger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'
import { env } from '~/api/utils/env'

export const pinoLogger = () =>
  logger({
    pino: pino(
      {
        level: env.LOG_LEVEL || 'info',
        formatters: {
          level(label) {
            return { level: label }
          }
        }
      },
      env.NODE_ENV === 'production' ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID()
    }
  })
