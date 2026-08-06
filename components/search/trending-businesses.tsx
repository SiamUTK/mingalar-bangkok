'use client'

import { Star, TrendingUp, ArrowRight } from 'lucide-react'

const TRENDING_BUSINESSES = [
  { name: "Sai's Myanmar Kitchen", rating: 4.8, reviews: 256, category: 'Restaurant' },
  { name: 'Myanmar Tech Solutions', rating: 4.6, reviews: 89, category: 'IT Services' },
  { name: 'Golden Mandalay Travel', rating: 4.7, reviews: 145, category: 'Travel' },
]

interface TrendingBusinessesProps {
  onBusinessClick?: (business: string) => void
}

export function TrendingBusinesses({ onBusinessClick }: TrendingBusinessesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trending businesses</h3>
      </div>
      <div className="space-y-2">
        {TRENDING_BUSINESSES.map((business) => (
          <button
            key={business.name}
            onClick={() => onBusinessClick?.(business.name)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-3 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{business.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{business.category}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs font-medium text-foreground">{business.rating}</span>
                  <span className="text-xs text-muted-foreground">({business.reviews})</span>
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}


