'use client'

import { Button } from '@budget-tracker/ui/components/ui/button'
import { useToast } from '@budget-tracker/ui/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { InternalLink } from '~/web/config/app'
import { signOut } from '~/web/features/signIn/actions'

export const SignOutButton = () => {
  const router = useRouter()
  const { toast } = useToast()

  const signOutMutation = useMutation({
    mutationFn: () => signOut(),
    mutationKey: ['signOut'],
    onSuccess: () => {
      router.push(InternalLink.signIn)
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive'
      })
    }
  })

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 hover:bg-muted hover:text-muted-foreground"
      onClick={() => signOutMutation.mutate()}
      disabled={signOutMutation.isPending}
    >
      <LogOut className="w-5 h-5" />
      <span>Sign out</span>
    </Button>
  )
}
