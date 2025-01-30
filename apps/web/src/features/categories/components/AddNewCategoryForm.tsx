'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { LoaderCircle } from '@budget-tracker/ui/components/ui/loaderCircle'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { ZodValidator } from '@tanstack/zod-form-adapter'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { InternalLink } from '~/web/config/app'
import { createCategory } from '../actions'

const addNewCategoryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required')
})

type Form = z.infer<typeof addNewCategoryFormSchema>

export const AddNewCategoryForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    mutationKey: ['createCategory'],
    onSuccess: () => {
      toast({
        title: 'Category created',
        description: 'Your category has been created successfully.',
        variant: 'default'
      })
      router.push(InternalLink.categories)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to create category. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm<Form, ZodValidator>({
    defaultValues: {
      name: '',
      description: ''
    },
    validators: {
      onSubmit: addNewCategoryFormSchema
    },
    onSubmit: ({ value }) => createCategoryMutation.mutate(value)
  })

  return (
    <section className="layout-section">
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          form.handleSubmit()
        }}
        className="flex w-full max-w-sm flex-col gap-4"
        noValidate
      >
        <form.Field name="name">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter category name"
                disabled={createCategoryMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
        <form.Field name="description">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Description</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter category description"
                disabled={createCategoryMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          disabled={createCategoryMutation.isPending}
          className="mt-2"
        >
          {createCategoryMutation.isPending && <LoaderCircle />}
          Create Category
        </Button>
      </form>
    </section>
  )
}
