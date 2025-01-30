import type { getUserCategories } from './serverActions'

export type Category = Awaited<
  ReturnType<typeof getUserCategories>
>['categories'][number]
