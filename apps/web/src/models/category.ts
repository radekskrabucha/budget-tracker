import type { getUserCategories } from '~/web/features/categories/serverActions'

export type Category = Awaited<
  ReturnType<typeof getUserCategories>
>['categories'][number]
