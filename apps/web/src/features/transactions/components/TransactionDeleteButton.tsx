'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { LoadingCircleIndicator } from '@budget-tracker/ui/components/ui/loading-circle-indicator'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { InternalLink } from '~/web/config/app'
import { deleteUserTransaction } from '../actions'

type TransactionDeleteButtonProps = {
  id: string
}

export const TransactionDeleteButton: React.FC<
  TransactionDeleteButtonProps
> = ({ id }) => {
  const router = useRouter()
  const { toast } = useToast()

  const deleteTransactionMutation = useMutation({
    mutationFn: () => deleteUserTransaction(id),
    mutationKey: ['deleteTransaction', id],
    onSuccess: () => {
      toast({
        title: 'Transaction deleted',
        description: 'Transaction has been deleted successfully.',
        variant: 'default'
      })
      router.push(InternalLink.transactions)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to delete transaction. Please try again.',
        variant: 'destructive'
      })
    }
  })

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => deleteTransactionMutation.mutate()}
      disabled={deleteTransactionMutation.isPending}
    >
      {deleteTransactionMutation.isPending && (
        <LoadingCircleIndicator className="mr-2" />
      )}
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  )
}
