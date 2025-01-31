import { buttonVariants } from '@budget-tracker/ui/components/ui/button'
import { isEmpty } from '@budget-tracker/utils'
import { FolderIcon } from 'lucide-react'
import Link from 'next/link'
import { EmptyState } from '~/web/components/EmptyState'
import { InternalLink } from '~/web/config/app'
import { CategoryTile } from './components/CategoryTile'
import { getUserCategories } from './serverActions'

export const CategoriesPage = async () => {
  const data = await getUserCategories()

  if (isEmpty(data.categories)) {
    return (
      <section className="layout-section">
        <EmptyState
          icon={FolderIcon}
          title="No categories yet"
          description="Create categories to better organize your transactions."
          action={
            <Link
              href={InternalLink.addCategory}
              className={buttonVariants()}
            >
              Add category
            </Link>
          }
        />
      </section>
    )
  }

  return (
    <>
      <section className="layout-section gap-4">
        {data.categories.map(category => (
          <CategoryTile
            key={category.id}
            {...category}
          />
        ))}
      </section>
    </>
  )
}
