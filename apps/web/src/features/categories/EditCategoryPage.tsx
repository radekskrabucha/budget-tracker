import { notFound } from 'next/navigation'
import { EditCategoryForm } from './components/EditCategoryForm'
import { getUserCategory } from './serverActions'

type EditCategoryPageProps = {
  params: {
    id: string
  }
}

export const EditCategoryPage: React.FC<EditCategoryPageProps> = async ({
  params: { id }
}) => {
  const data = await getUserCategory(id)

  if (!data) {
    return notFound()
  }

  return (
    <>
      <section className="layout-section">
        <h2 className="text-2xl font-semibold">Edit category</h2>
        <p className="text-muted-foreground">Edit the category details here.</p>
      </section>
      <EditCategoryForm {...data.category} />
    </>
  )
}
