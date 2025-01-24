import type { Hono } from 'hono'
import { hc } from 'hono/client'
import type { appRouter, adminRouter } from '~/api/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HonoClientArgs<T extends Hono<any, any, any>> = Parameters<typeof hc<T>>

export type AdminRouter = typeof adminRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminClientBase = hc<AdminRouter>('')
export type AdminClient = typeof adminClientBase
export const adminHC = (...args: HonoClientArgs<AdminRouter>): AdminClient =>
  hc<AdminRouter>(...args)

export type AppRouter = typeof appRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appClientBase = hc<AppRouter>('')
export type AppClient = typeof appClientBase
export const appHC = (...args: HonoClientArgs<AppRouter>): AppClient =>
  hc<AppRouter>(...args)
