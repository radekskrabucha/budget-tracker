import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { env } from '~/api/utils/env'

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql)
