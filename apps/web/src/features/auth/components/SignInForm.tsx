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
import { signIn } from '../actions'

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const SignInForm = () => {
  const { replace } = useRouter()
  const { toast } = useToast()
  const signInMutation = useMutation({
    mutationFn: signIn,
    mutationKey: ['signIn'],
    onSuccess: () => {
      replace(InternalLink.home)
    },
    onError: () => {
      toast({
        title: 'Could not sign in.',
        description: 'Please check your email and password and try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: signInSchema
    },
    onSubmit: ({ value }) => signInMutation.mutate(value)
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
              disabled={signInMutation.isPending}
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
              disabled={signInMutation.isPending}
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
        disabled={signInMutation.isPending}
        className="mt-2"
      >
        {signInMutation.isPending && <LoadingCircleIndicator />}
        Sign Up
      </Button>
    </form>
  )
}
