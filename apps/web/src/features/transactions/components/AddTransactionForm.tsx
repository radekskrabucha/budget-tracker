'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { Calendar } from '@budget-tracker/ui/components/ui/calendar'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { LoaderCircle } from '@budget-tracker/ui/components/ui/loaderCircle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@budget-tracker/ui/components/ui/popover'
import {
  RadioGroup,
  RadioGroupItem
} from '@budget-tracker/ui/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@budget-tracker/ui/components/ui/select'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { Textarea } from '@budget-tracker/ui/components/ui/textarea'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { cn } from '@budget-tracker/ui/utils/styles'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { ZodValidator } from '@tanstack/zod-form-adapter'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { InternalLink } from '~/web/config/app'
import { Category } from '~/web/models/category'
import { createUserTransaction } from '../actions'

const addTransactionFormSchema = z.object({
  type: z.enum(['income', 'expense']),
  date: z.date({ message: 'Date is required' }),
  amount: z.string().refine(value => Number(value) > 0, {
    message: 'Amount must be greater than 0'
  }),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().optional()
})

type Form = z.infer<typeof addTransactionFormSchema>

type AddTransactionFormProps = {
  categories: Array<Category>
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  categories
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const createTransactionMutation = useMutation({
    mutationFn: createUserTransaction,
    mutationKey: ['createTransaction'],
    onSuccess: () => {
      toast({
        title: 'Transaction created',
        description: 'Your transaction has been created successfully.',
        variant: 'default'
      })
      router.push(InternalLink.transactions)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to create transaction. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm<Form, ZodValidator>({
    defaultValues: {
      type: 'expense',
      // @ts-expect-error it expects Date, but initial value is undefined
      date: undefined,
      amount: '',
      categoryId: ''
    },
    validators: {
      onSubmit: addTransactionFormSchema
    },
    onSubmit: ({ value }) => {
      createTransactionMutation.mutate({
        ...value,
        amount: Number(value.amount)
      })
    }
  })

  return (
    <section className="layout-section">
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex w-full max-w-md flex-col gap-5"
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
                    Expense
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

        <div className="flex flex-wrap gap-4">
          <form.Field name="date">
            {field => (
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor={field.name}>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.state.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.state.value ? (
                        format(field.state.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.state.value}
                      onSelect={date =>
                        field.handleChange(() => date || new Date())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {field.state.meta.errors ? (
                  <StatusMessage variant="error">
                    {field.state.meta.errors[0]}
                  </StatusMessage>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="amount">
            {field => (
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  type="number"
                  step="1"
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="0.00"
                  disabled={createTransactionMutation.isPending}
                />
                {field.state.meta.errors ? (
                  <StatusMessage variant="error">
                    {field.state.meta.errors[0]}
                  </StatusMessage>
                ) : null}
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="categoryId">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Category</Label>
              <Select
                defaultValue={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                placeholder="Add some details about your transaction..."
                disabled={createTransactionMutation.isPending}
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
          disabled={createTransactionMutation.isPending}
          className="mt-2"
        >
          {createTransactionMutation.isPending && <LoaderCircle />}
          Add transaction
        </Button>
      </form>
    </section>
  )
}
