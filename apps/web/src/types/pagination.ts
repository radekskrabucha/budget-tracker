import { GetUserTransactionsRes } from '~/web/features/transactions/serverActions'

export type PaginationMeta = Extract<
  GetUserTransactionsRes,
  { meta: unknown }
>['meta']
