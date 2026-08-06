'use client'

import { TrendingUp, Building2, Briefcase, Home, Plane, BookOpen, Zap } from 'lucide-react'

const TRENDING_CATEGORIES = [
  { name: 'Restaurants', count: 2847, icon: Building2 },
  { name: 'Jobs', count: 3284, icon: Briefcase },
  { name: 'Housing', count: 1856, icon: Home },
  { name: 'Travel', count: 892, icon: Plane },
  { name: 'Learn Thai', count: 345, icon: BookOpen },
  { name: 'Events', count: 456, icon: Zap },
]

interface TrendingCategoriesProps {
  onCategoryClick?: (category: string) => void
}

export function TrendingCategories({ onCategoryClick }: TrendingCategoriesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trending categories</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {TRENDING_CATEGORIES.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.name}
              onClick={() => onCategoryClick?.(category.name)}
              className="rounded-lg border border-border bg-card p-3 text-left hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count.toLocaleString()}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}


