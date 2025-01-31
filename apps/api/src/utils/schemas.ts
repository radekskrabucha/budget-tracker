import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
})

export type PaginationQuery = z.infer<typeof paginationSchema>
