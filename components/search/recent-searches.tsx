'use client'

import { Clock, X } from 'lucide-react'
import { Button } from '@/components/ui'

interface RecentSearch {
  id: string
  query: string
  timestamp: Date
}

const MOCK_RECENT_SEARCHES: RecentSearch[] = [
  { id: '1', query: 'Thai lessons in Bangkok', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: '2', query: 'Myanmar restaurants', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: '3', query: 'Apartment for rent', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
]

interface RecentSearchesProps {
  onSearchClick?: (query: string) => void
}

export function RecentSearches({ onSearchClick }: RecentSearchesProps) {
  const [recent, setRecent] = React.useState(MOCK_RECENT_SEARCHES)

  const handleRemove = (id: string) => {
    setRecent(recent.filter((item) => item.id !== id))
  }

  if (recent.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent searches</h3>
      <div className="space-y-2">
        {recent.map((search) => (
          <button
            key={search.id}
            onClick={() => onSearchClick?.(search.query)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{search.query}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove(search.id)
              }}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </button>
        ))}
      </div>
    </div>
  )
}

import React from 'react'

