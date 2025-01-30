import { CategoryTile } from './components/CategoryTile'
import { getUserCategories } from './serverActions'

export const CategoriesPage = async () => {
  const data = await getUserCategories()

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
