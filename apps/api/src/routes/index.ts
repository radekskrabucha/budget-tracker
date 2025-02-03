import { Hono } from 'hono'
import type { AppBindings } from '../types/app'
import { adminRouter as admin } from './admin'
import { categoriesRouter } from './categories'
import { dashboardRouter } from './dashboard'
import { transactionsRouter } from './transactions'

export const appRouter = new Hono<AppBindings>()
  .route('/', categoriesRouter)
  .route('/', transactionsRouter)
  .route('/', dashboardRouter)

export const adminRouter = new Hono<AppBindings>().route('/', admin)
