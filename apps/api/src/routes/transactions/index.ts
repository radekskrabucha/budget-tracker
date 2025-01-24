import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import {
  insertTransactionSchema,
  updateTransactionSchema
} from '~/api/lib/dbZodSchema/transaction'
import { authMiddleware } from '~/api/middleware/auth'
import type { AppBindings } from '~/api/types/app'
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '~/api/utils/httpCodes'
import { paginationSchema } from '~/api/utils/schemas'
import {
  createUserTransaction,
  deleteUserTransaction,
  getUserTransaction,
  getUserTransactions,
  updateUserTransaction
} from './transactions.services'

export const transactionsRouter = new Hono<AppBindings>()
  .basePath('/transactions')
  .use(authMiddleware)
  .get('/', zValidator('query', paginationSchema), async c => {
    const user = c.get('user')
    const pagination = c.req.valid('query')
    const result = await getUserTransactions(user.id, pagination)

    return c.json(result, OK)
  })
  .get('/:id', async c => {
    const user = c.get('user')
    const { id } = c.req.param()

    const transaction = await getUserTransaction(id, user.id)

    if (!transaction) {
      return c.json({ message: 'Transaction not found' }, NOT_FOUND)
    }

    return c.json({ transaction }, OK)
  })
  .post('/', zValidator('json', insertTransactionSchema), async c => {
    const user = c.get('user')
    const data = c.req.valid('json')

    const transaction = await createUserTransaction(user.id, data)

    if (!transaction) {
      return c.json({ message: 'Failed to create transaction' }, BAD_REQUEST)
    }

    return c.json({ transaction }, CREATED)
  })
  .put('/:id', zValidator('json', updateTransactionSchema), async c => {
    const user = c.get('user')
    const { id } = c.req.param()
    const data = c.req.valid('json')

    const transaction = await updateUserTransaction(user.id, id, data)

    if (!transaction) {
      return c.json({ message: 'Transaction not found' }, NOT_FOUND)
    }

    return c.json({ transaction }, OK)
  })
  .delete('/:id', async c => {
    const user = c.get('user')
    const { id } = c.req.param()

    const transaction = await deleteUserTransaction(user.id, id)

    if (!transaction) {
      return c.json({ message: 'Transaction not found' }, NOT_FOUND)
    }

    return c.json({ transaction }, OK)
  })
