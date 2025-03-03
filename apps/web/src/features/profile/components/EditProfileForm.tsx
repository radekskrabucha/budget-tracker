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
import { updateProfile } from '../actions'

const editProfileSchema = z.object({
  name: z.string().min(1, 'Name is required')
})

type EditProfileFormProps = {
  name: string
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ name }) => {
  const router = useRouter()
  const { toast } = useToast()

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ['updateProfile'],
    onSuccess: () => {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        variant: 'default'
      })
      router.push(InternalLink.profile)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const form = useForm({
    defaultValues: {
      name
    },
    validators: {
      onSubmit: editProfileSchema
    },
    onSubmit: ({ value }) => updateProfileMutation.mutate(value)
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
                placeholder="John Doe"
                disabled={updateProfileMutation.isPending}
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
          disabled={updateProfileMutation.isPending}
          className="mt-2"
        >
          {updateProfileMutation.isPending && <LoadingCircleIndicator />}
          Save Changes
        </Button>
      </form>
    </section>
  )
}
