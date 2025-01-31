import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { env } from '~/api/utils/env'
import * as authSchema from './schema/auth.schema'
import * as categorySchema from './schema/category.schema'
import * as transactionSchema from './schema/transaction.schema'

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, {
  schema: {
    ...authSchema,
    ...categorySchema,
    ...transactionSchema
  }
})
