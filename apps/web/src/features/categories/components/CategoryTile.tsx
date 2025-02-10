import { Badge } from '@budget-tracker/ui/components/ui/badge'
import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'
import { Category } from '~/web/models/category'
import { CategoryDeleteButton } from './CategoryDeleteButton'

export const CategoryTile: React.FC<Category> = ({
  id,
  name,
  description,
  type
}) => (
  <div className="bg-card text-card-foreground border-border hover:border-primary flex items-center justify-between gap-4 rounded-lg border p-6 shadow-sm transition-colors">
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap-reverse items-center gap-2">
        <h3 className="font-medium">{name}</h3>
        <Badge variant={type === 'income' ? 'default' : 'destructive'}>
          {type === 'income' ? 'Income' : 'Expense'}
        </Badge>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <div className="flex items-center gap-2 max-md:gap-0">
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
