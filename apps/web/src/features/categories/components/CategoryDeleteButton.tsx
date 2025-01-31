'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteCategory } from '../actions'

type CategoryDeleteButtonProps = {
  id: string
}

export const CategoryDeleteButton: React.FC<CategoryDeleteButtonProps> = ({
  id
}) => {
  const { toast } = useToast()
  const router = useRouter()

  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(id),
    mutationKey: ['deleteCategory', id],
    onSuccess: () => {
      toast({
        title: 'Category deleted',
        description: 'Category has been deleted successfully.',
        variant: 'default'
      })
      router.refresh()
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
      className="text-muted-foreground hover:text-destructive transition-colors"
      onClick={() => deleteCategoryMutation.mutate()}
      disabled={deleteCategoryMutation.isPending}
    >
      <Trash2 className="size-4" />
      <span className="sr-only">Delete category</span>
    </Button>
  )
}
