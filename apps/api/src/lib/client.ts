import type { Hono } from 'hono'
import { hc } from 'hono/client'
import type { adminRouter } from '~/api/routes/admin'
import type { categoriesRouter } from '~/api/routes/categories'
import type { testRouter } from '~/api/routes/test'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HonoClientArgs<T extends Hono<any, any, any>> = Parameters<typeof hc<T>>

export type TestRouter = typeof testRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testClientBase = hc<TestRouter>('')
export type TestClient = typeof testClientBase
export const testHC = (...args: HonoClientArgs<TestRouter>): TestClient =>
  hc<TestRouter>(...args)

export type CategoriesRouter = typeof categoriesRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categoriesClientBase = hc<CategoriesRouter>('')
export type CategoriesClient = typeof categoriesClientBase
export const categoriesHC = (
  ...args: HonoClientArgs<CategoriesRouter>
): CategoriesClient => hc<CategoriesRouter>(...args)

export type AdminRouter = typeof adminRouter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminClientBase = hc<AdminRouter>('')
export type AdminClient = typeof adminClientBase
export const adminHC = (...args: HonoClientArgs<AdminRouter>): AdminClient =>
  hc<AdminRouter>(...args)
