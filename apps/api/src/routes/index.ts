import { Hono } from 'hono'
import type { AppBindings } from '../types/app'
import { adminRouter as admin } from './admin'
import { categoriesRouter } from './categories'
import { transactionsRouter } from './transactions'

export const appRouter = new Hono<AppBindings>()
  .route('/', categoriesRouter)
  .route('/', transactionsRouter)

export const adminRouter = new Hono<AppBindings>().route('/', admin)
