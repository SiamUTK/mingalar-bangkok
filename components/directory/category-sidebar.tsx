'use client'

import { useState } from 'react'
import { Card } from '@/components/ui'
import { ChevronDown } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface CategorySidebarProps {
  categories?: Category[]
  selectedCategory?: string
  onSelectCategory?: (categoryId: string) => void
}

const defaultCategories: Category[] = [
  { id: 'restaurants', name: 'Restaurants', icon: '🍽️', count: 245 },
  { id: 'hotels', name: 'Hotels & Accommodation', icon: '🏨', count: 128 },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', count: 342 },
  { id: 'services', name: 'Services', icon: '🔧', count: 567 },
  { id: 'healthcare', name: 'Healthcare', icon: '⚕️', count: 89 },
  { id: 'education', name: 'Education', icon: '📚', count: 156 },
  { id: 'travel', name: 'Travel & Tours', icon: '✈️', count: 93 },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭', count: 124 },
]

export function CategorySidebar({
  categories = defaultCategories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <aside className="hidden lg:block lg:w-64">
      <Card className="sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-semibold text-foreground">Categories</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory?.(category.id)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({category.count})</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>
    </aside>
  )
}


