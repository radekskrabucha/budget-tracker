import { getUserTransaction } from '~/web/features/transactions/serverActions'

export type TransactionWithCategory = Awaited<
  ReturnType<typeof getUserTransaction>
>['transaction']

export type Transaction = Omit<TransactionWithCategory, 'category'>

export type TransactionType = Transaction['type']
