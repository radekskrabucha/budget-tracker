import { AddNewCategoryForm } from './components/AddNewCategoryForm'

export const AddNewCategoryPage = () => (
  <>
    <section className="layout-section">
      <h2 className="text-2xl font-semibold">Add new category</h2>
      <p className="text-muted-foreground text-sm">
        Add a new category to your budget tracker.
      </p>
    </section>
    <AddNewCategoryForm />
  </>
)
