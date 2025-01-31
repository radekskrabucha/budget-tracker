import { Button } from '@budget-tracker/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@budget-tracker/ui/components/ui/dropdown-menu'
import { KeyRound, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'

export const ProfileOptions = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-muted"
      >
        <MoreVertical className="text-muted-foreground" />
        <span className="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href={InternalLink.changePassword}>
          <KeyRound className="text-muted-foreground mr-2 size-4" />
          Change password
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={InternalLink.editProfile}>
          <Pencil className="text-muted-foreground mr-2 size-4" />
          Edit profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-destructive focus:text-destructive"
        asChild
      >
        <Link href={InternalLink.deleteProfile}>
          <Trash2 className="mr-2 size-4" />
          Delete profile
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
