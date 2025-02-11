'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { LoadingCircleIndicator } from '@budget-tracker/ui/components/ui/loading-circle-indicator'
import {
  RadioGroup,
  RadioGroupItem
} from '@budget-tracker/ui/components/ui/radio-group'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { Textarea } from '@budget-tracker/ui/components/ui/textarea'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import type { ZodValidator } from '@tanstack/zod-form-adapter'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { InternalLink } from '~/web/config/app'
import type { Category } from '~/web/models/category'
import { updateCategory } from '../actions'

const editCategoryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['income', 'expense'])
})

type Form = z.infer<typeof editCategoryFormSchema>

type EditCategoryFormProps = Category

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  id,
  name,
  description,
  type
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    mutationKey: ['updateCategory'],
    onSuccess: () => {
      toast({
        title: 'Category updated',
        description: 'Your category has been updated successfully.',
        variant: 'default'
      })
      router.push(InternalLink.categories)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to update category. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm<Form, ZodValidator>({
    defaultValues: {
      name,
      description,
      type
    },
    validators: {
      onSubmit: editCategoryFormSchema
    },
    onSubmit: ({ value }) =>
      updateCategoryMutation.mutate({
        ...value,
        id
      })
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
        <form.Field name="type">
          {field => (
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <RadioGroup
                value={field.state.value}
                onValueChange={field.handleChange}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="expense"
                    id="expense"
                  />
                  <Label
                    htmlFor="expense"
                    className="font-normal"
                  >
                    Expenses
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="income"
                    id="income"
                  />
                  <Label
                    htmlFor="income"
                    className="font-normal"
                  >
                    Income
                  </Label>
                </div>
              </RadioGroup>
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

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
                disabled={updateCategoryMutation.isPending}
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
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter category description"
                disabled={updateCategoryMutation.isPending}
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
          disabled={updateCategoryMutation.isPending}
          className="mt-2"
        >
          {updateCategoryMutation.isPending && <LoadingCircleIndicator />}
          Update Category
        </Button>
      </form>
    </section>
  )
}
