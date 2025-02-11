import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from '~/web/components/Pagination'
import { InternalLink } from '~/web/config/app'
import { PaginationMeta } from '~/web/types/pagination'

type PaginationWithMetaProps = PaginationMeta & {
  getQuery: (page: number) => Record<string, string>
}

export const PaginationWithMeta: React.FC<PaginationWithMetaProps> = ({
  page,
  limit,
  total,
  getQuery
}) => {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPageNumbers(totalPages, page)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname: InternalLink.transactions,
              query: page > 1 ? getQuery(page - 1) : undefined
            }}
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`${pageNumber}-${index}`}>
            {pageNumber === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={{
                  pathname: InternalLink.transactions,
                  query: getQuery(pageNumber)
                }}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={{
              pathname: InternalLink.transactions,
              query: page < totalPages ? getQuery(page + 1) : undefined
            }}
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

// Generate array of page numbers to display
const getPageNumbers = (totalPages: number, page: number) => {
  const pages: (number | 'ellipsis')[] = []

  if (totalPages <= 3) {
    // Show all pages if 3 or fewer
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Always show first page
  pages.push(1)

  if (page > 3) {
    pages.push('ellipsis')
  }

  // Show current page and surrounding pages
  for (
    let i = Math.max(2, page - 1);
    i <= Math.min(totalPages - 1, page + 1);
    i++
  ) {
    pages.push(i)
  }

  if (page < totalPages - 2) {
    pages.push('ellipsis')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}
