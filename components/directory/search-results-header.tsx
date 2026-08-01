'use client'

import { Container } from '@/components/ui'

interface SearchResultsHeaderProps {
  query?: string
  resultCount?: number
  location?: string
  onClearSearch?: () => void
}

export function SearchResultsHeader({
  query,
  resultCount = 0,
  location = 'Bangkok',
  onClearSearch,
}: SearchResultsHeaderProps) {
  return (
    <section className="border-b border-border bg-background py-6">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {query ? `Results for "${query}"` : 'All Businesses'}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {resultCount} businesses found in {location}
              {query && (
                <>
                  {' • '}
                  <button
                    onClick={onClearSearch}
                    className="text-primary hover:underline"
                  >
                    Clear search
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="flex gap-2">
            <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
              <option>Sort by Relevance</option>
              <option>Rating: High to Low</option>
              <option>Distance: Closest</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </Container>
    </section>
  )
}

