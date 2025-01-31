import { getUserTransaction } from '~/web/features/transactions/serverActions'

export type TransactionBase = Exclude<
  Awaited<ReturnType<typeof getUserTransaction>>,
  undefined
>['transaction']
export type TransactionWithCategory = Omit<TransactionBase, 'categoryId'>

export type TransactionWithCategoryId = Omit<TransactionBase, 'category'>

export type Transaction = Omit<TransactionWithCategory, 'category'>

export type TransactionType = TransactionBase['type']
