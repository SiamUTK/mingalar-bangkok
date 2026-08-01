'use client'

import { Flame } from 'lucide-react'

const POPULAR_SEARCHES = [
  'Myanmar restaurants',
  'Tech jobs Bangkok',
  'English tutor',
  'Apartment near BTS',
  'Travel packages',
  'Thai language course',
]

interface PopularSearchesProps {
  onSearchClick?: (query: string) => void
}

export function PopularSearches({ onSearchClick }: PopularSearchesProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Popular searches</h3>
      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchClick?.(search)}
            className="flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground hover:border-primary hover:bg-primary/10"
          >
            <Flame className="h-3 w-3 text-orange-500" />
            {search}
          </button>
        ))}
      </div>
    </div>
  )
}

