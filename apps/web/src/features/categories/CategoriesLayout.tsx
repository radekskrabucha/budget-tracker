import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { InternalLink } from '~/web/config/app'

export const CategoriesLayout = ({ children }: React.PropsWithChildren) => (
  <>
    <div className="layout-section">
      <div className="flex items-center justify-between">
        <Link
          href={InternalLink.categories}
          className="text-2xl font-semibold"
        >
          Your categories
        </Link>
        <Link
          href={InternalLink.addCategory}
          className={buttonVariants()}
        >
          <Plus className="size-4" />
          Add new category
        </Link>
      </div>
    </div>
    {children}
  </>
)
