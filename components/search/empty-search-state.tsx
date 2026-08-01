'use client'

import { Search } from 'lucide-react'
import { EmptyState as FoundationEmptyState } from '@/components/ui'
import { Button } from '@/components/ui'

interface EmptySearchStateProps {
  onGetStarted?: () => void
}

export function EmptySearchState({ onGetStarted }: EmptySearchStateProps) {
  return (
    <div className="py-12">
      <FoundationEmptyState
        icon={<Search className="h-12 w-12 text-muted-foreground" />}
        title="Start searching"
        description="Explore businesses, jobs, housing, travel, and more from the Myanmar community in Thailand"
        action={<Button onClick={onGetStarted}>Browse categories</Button>}
      />
    </div>
  )
}

