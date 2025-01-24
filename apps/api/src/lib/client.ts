import { hc } from 'hono/client'
import { app } from '~/api/index'
import type { categoriesRouter } from '~/api/routes/categories'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = hc<typeof app>('')
export type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categoriesClient = hc<typeof categoriesRouter>('')
export type CategoriesClient = typeof categoriesClient

export const hcWithTypeCategories = (
  ...args: Parameters<typeof hc<typeof categoriesRouter>>
): CategoriesClient => hc<typeof categoriesRouter>(...args)
