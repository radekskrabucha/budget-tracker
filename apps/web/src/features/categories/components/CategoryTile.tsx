import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { Category } from '../types'
import { CategoryDeleteButton } from './CategoryDeleteButton'

export const CategoryTile: React.FC<Category> = ({ id, name, description }) => (
  <div className="bg-card text-card-foreground border-border hover:border-primary flex items-center justify-between gap-4 rounded-lg border p-6 shadow-sm transition-colors">
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <div className="flex items-center gap-2">
      <Link
        href={InternalLink.editCategory(id)}
        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      >
        <Pencil className="text-muted-foreground size-4" />
        <span className="sr-only">Edit category</span>
      </Link>
      <CategoryDeleteButton id={id} />
    </div>
  </div>
)
