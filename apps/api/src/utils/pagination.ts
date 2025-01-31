import type { PaginationQuery } from './schemas'

export type PaginationValues = {
  limit: number
  offset: number
  page: number
}

export const getPaginationValues = (
  { limit, page }: PaginationQuery,
  defaultLimit = 10
): PaginationValues | undefined => {
  if (page && typeof limit === 'undefined') {
    return {
      page,
      limit: defaultLimit,
      offset: (page - 1) * defaultLimit
    }
  }
  if (limit && typeof page === 'undefined') {
    const defaultPage = 1

    return {
      page: defaultPage,
      limit,
      offset: (defaultPage - 1) * limit
    }
  }
  if (limit && page) {
    return {
      limit,
      page,
      offset: (page - 1) * limit
    }
  }

  return undefined
}

export const getPaginationParams = (
  paginationValues: PaginationValues | undefined
) => ({
  ...(paginationValues
    ? {
        limit: paginationValues.limit,
        offset: paginationValues.offset
      }
    : {})
})
