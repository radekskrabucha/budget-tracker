'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { deleteCategory } from '../actions'

type CategoryDeleteButtonProps = {
  id: string
}

export const CategoryDeleteButton: React.FC<CategoryDeleteButtonProps> = ({
  id
}) => {
  const { toast } = useToast()

  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(id),
    mutationKey: ['deleteCategory', id],
    onSuccess: () => {
      toast({
        title: 'Category deleted',
        description: 'Category has been deleted successfully.',
        variant: 'default'
      })
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to delete category. Please try again.',
        variant: 'destructive'
      })
    }
  })

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:text-destructive"
      onClick={() => deleteCategoryMutation.mutate()}
      disabled={deleteCategoryMutation.isPending}
    >
      <Trash2 className="size-4" />
      <span className="sr-only">Delete category</span>
    </Button>
  )
}
