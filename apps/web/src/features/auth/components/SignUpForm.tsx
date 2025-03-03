'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { LoadingCircleIndicator } from '@budget-tracker/ui/components/ui/loading-circle-indicator'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { InternalLink } from '~/web/config/app'
import { getNameFromEmail } from '~/web/utils/email'
import { signUp } from '../actions'

const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string()
})

export const SignUpForm = () => {
  const { replace } = useRouter()
  const { toast } = useToast()
  const signUpMutation = useMutation({
    mutationFn: signUp,
    mutationKey: ['signUp'],
    onSuccess: () => {
      replace(InternalLink.home)
    },
    onError: () => {
      toast({
        title: 'Something went wrong.',
        description:
          'We were unable to create your account. Please use a different email or try again later.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm({
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
      className="flex w-full max-w-sm flex-col gap-4"
      noValidate
    >
      <form.Field name="name">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>
              Name
              <span className="text-muted-foreground -mb-2 text-xs">
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
                {field.state.meta.errors[0]?.message}
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
                {field.state.meta.errors[0]?.message}
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
                {field.state.meta.errors[0]?.message}
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
        {signUpMutation.isPending && <LoadingCircleIndicator />}
        Sign Up
      </Button>
    </form>
  )
}
