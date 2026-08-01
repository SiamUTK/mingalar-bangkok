'use client'

import { EmptyState } from '@/components/ui'
import { Button } from '@/components/ui/button-variants'
import { AlertCircle, RotateCcw } from 'lucide-react'

interface EmptyResultsProps {
  searchQuery?: string
  filters?: string[]
  onReset?: () => void
}

export function EmptyResults({
  searchQuery,
  filters = [],
  onReset,
}: EmptyResultsProps) {
  const message = searchQuery
    ? `No results found for "${searchQuery}"`
    : 'No businesses found matching your criteria'

  const subtitle = filters.length > 0
    ? 'Try adjusting your filters or search term'
    : 'Try a different search or explore other categories'

  return (
    <div className="py-12">
      <EmptyState
        icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
        title={message}
        description={subtitle}
        action={
          <Button
            size="sm"
            variant="secondary"
            icon={<RotateCcw className="h-4 w-4" />}
            onClick={onReset}
          >
            Reset Filters
          </Button>
        }
      />
    </div>
  )
}

