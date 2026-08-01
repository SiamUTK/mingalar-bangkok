'use client'

import { SearchX } from 'lucide-react'
import { EmptyState as FoundationEmptyState } from '@/components/ui'
import { Button } from '@/components/ui'

interface NoResultsStateProps {
  query: string
  onClearSearch?: () => void
}

export function NoResultsState({ query, onClearSearch }: NoResultsStateProps) {
  return (
    <div className="py-12">
      <FoundationEmptyState
        icon={<SearchX className="h-12 w-12 text-muted-foreground" />}
        title="No results found"
        description={`We couldn't find anything matching "${query}". Try adjusting your search terms or browsing categories.`}
        action={<Button onClick={onClearSearch}>Clear search</Button>}
      />
    </div>
  )
}

