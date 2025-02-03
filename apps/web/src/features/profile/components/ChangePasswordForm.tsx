'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { LoadingCircleIndicator } from '@budget-tracker/ui/components/ui/loading-circle-indicator'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { ZodValidator } from '@tanstack/zod-form-adapter'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { InternalLink } from '~/web/config/app'
import { changePassword } from '../actions'

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: 'Current password is required' })
      .min(8, {
        message: 'Password must be at least 8 characters long'
      }),
    newPassword: z
      .string({ message: 'New password is required' })
      .min(8, { message: 'New password must be at least 8 characters long' }),
    confirmNewPassword: z.string({
      message: 'Confirm new password is required'
    })
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword']
  })
  .refine(data => data.confirmNewPassword === data.newPassword, {
    message: 'Confirm password must match new password',
    path: ['confirmNewPassword']
  })

export type Form = z.infer<typeof changePasswordSchema>

export const ChangePasswordForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    mutationKey: ['changePassword'],
    onSuccess: () => {
      toast({
        title: 'Password changed',
        description: 'Your password has been changed successfully.',
        variant: 'default'
      })
      router.push(InternalLink.profile)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description:
          'Failed to change password. Please check your current password and try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm<Form, ZodValidator>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validators: {
      onSubmit: changePasswordSchema
    },
    onSubmit: ({ value: { currentPassword, newPassword } }) =>
      changePasswordMutation.mutate({
        currentPassword,
        newPassword
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
        <form.Field name="currentPassword">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Current password</Label>
              <Input
                id={field.name}
                type="password"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="••••••••"
                disabled={changePasswordMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
        <form.Field name="newPassword">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>New password</Label>
              <Input
                id={field.name}
                type="password"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="••••••••"
                disabled={changePasswordMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
        <form.Field name="confirmNewPassword">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Confirm new password</Label>
              <Input
                id={field.name}
                type="password"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="••••••••"
                disabled={changePasswordMutation.isPending}
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
          disabled={changePasswordMutation.isPending}
          className="mt-2"
        >
          {changePasswordMutation.isPending && <LoadingCircleIndicator />}
          Change Password
        </Button>
      </form>
    </section>
  )
}
