'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { Input } from '@budget-tracker/ui/components/ui/input'
import { Label } from '@budget-tracker/ui/components/ui/label'
import { LoadingCircleIndicator } from '@budget-tracker/ui/components/ui/loading-circle-indicator'
import { StatusMessage } from '@budget-tracker/ui/components/ui/statusMessage'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import type { ZodValidator } from '@tanstack/zod-form-adapter'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { InternalLink } from '~/web/config/app'
import { deleteProfile } from '../actions'

const CONFIRMATION_TEXT = 'delete my account'

const deleteProfileSchema = z
  .object({
    confirmation: z.string()
  })
  .refine(data => data.confirmation === CONFIRMATION_TEXT, {
    message: `Please type "${CONFIRMATION_TEXT}" exactly as it is`,
    path: ['confirmation']
  })

type Form = {
  confirmation: string
}

export const DeleteProfileForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const deleteProfileMutation = useMutation({
    mutationFn: deleteProfile,
    mutationKey: ['deleteProfile'],
    onSuccess: () => {
      toast({
        title: 'Profile deleted',
        description: 'Your profile has been deleted successfully.',
        variant: 'default'
      })
      router.push(InternalLink.signIn)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to delete profile. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm<Form, ZodValidator>({
    defaultValues: {
      confirmation: ''
    },
    validators: {
      onSubmit: deleteProfileSchema
    },
    onSubmit: () => {
      deleteProfileMutation.mutate()
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
        className="flex w-full max-w-sm flex-col gap-4"
        noValidate
      >
        <form.Field name="confirmation">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>
                Type{' '}
                <span className="bg-destructive/30 rounded-sm px-1 py-0.5 font-mono">
                  {CONFIRMATION_TEXT}
                </span>{' '}
                to confirm
              </Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={deleteProfileMutation.isPending}
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
          variant="destructive"
          disabled={deleteProfileMutation.isPending}
          className="mt-2"
        >
          {deleteProfileMutation.isPending && <LoadingCircleIndicator />}
          Delete Profile
        </Button>
      </form>
    </section>
  )
}
