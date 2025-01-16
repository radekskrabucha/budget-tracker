import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { env } from '~/api/utils/env'
import * as authSchema from './schema/auth.schema'

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, {
  schema: {
    ...authSchema
  }
})
