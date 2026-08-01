'use client'

import { Card, CardContent } from '@/components/ui'
import { Star, MapPin, DollarSign, ArrowRight } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  type: 'business' | 'job' | 'housing' | 'travel' | 'news'
  metadata?: {
    rating?: number
    reviews?: number
    price?: string
    location?: string
  }
}

interface UnifiedSearchResultsProps {
  results: SearchResult[]
  isLoading?: boolean
  onResultClick?: (result: SearchResult) => void
}

export function UnifiedSearchResults({ results, isLoading, onResultClick }: UnifiedSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {results.map((result) => (
        <Card
          key={result.id}
          hover
          interactive
          onClick={() => onResultClick?.(result)}
          className="cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {result.category}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground truncate">{result.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {result.metadata?.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{result.metadata.rating}</span>
                      {result.metadata.reviews && <span>({result.metadata.reviews})</span>}
                    </div>
                  )}
                  {result.metadata?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{result.metadata.location}</span>
                    </div>
                  )}
                  {result.metadata?.price && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{result.metadata.price}</span>
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

