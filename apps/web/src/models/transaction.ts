import { getUserTransaction } from '~/web/features/transactions/serverActions'

export type TransactionWithCategory = Exclude<
  Awaited<ReturnType<typeof getUserTransaction>>,
  undefined
>['transaction']

export type Transaction = Omit<TransactionWithCategory, 'category'>

export type TransactionType = Transaction['type']
