import { Hono } from 'hono'
import type { AppBindings } from '../types/app'
import { categoriesRouter } from './categories'
import { testRouter } from './test'
import { adminRouter as admin } from './admin'

export const appRouter = new Hono<AppBindings>()
  .route('/', categoriesRouter)
  .route('/', testRouter)

export const adminRouter = new Hono<AppBindings>().route('/', admin)
