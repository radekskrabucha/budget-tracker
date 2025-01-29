'use client'

import { LoaderCircle } from '@budget-tracker/ui/components/ui/LoaderCircle'
import { Button } from '@budget-tracker/ui/components/ui/button'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { ZodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { getNameFromEmail } from '~/web/utils/email'
import { signUp } from '../actions'

const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional()
})

type Form = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
  const signUpMutation = useMutation({
    mutationFn: signUp,
    mutationKey: ['signUp']
  })

  const form = useForm<Form, ZodValidator>({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
    validators: {
      onSubmit: signUpSchema
    },
    onSubmit: ({ value }) =>
      signUpMutation.mutate({
        ...value,
        name: value.name
          ? value.name
          : getNameFromEmail(value.email) || value.email
      })
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      className="flex flex-col gap-4 max-w-sm w-full"
      noValidate
    >
      <form.Field name="name">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>
              Name
              <span className="text-xs text-muted-foreground -mb-2">
                {' '}
                (Optional)
              </span>
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={signUpMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              type="email"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="john@example.com"
              disabled={signUpMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              type="password"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="••••••••"
              disabled={signUpMutation.isPending}
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
        disabled={signUpMutation.isPending}
        className="mt-2"
      >
        {signUpMutation.isPending && <LoaderCircle />}
        Sign Up
      </Button>
    </form>
  )
}
