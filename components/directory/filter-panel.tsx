'use client'

import { useState } from 'react'
import { Card } from '@/components/ui'
import { ChevronDown } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  value: string
}

interface FilterPanelProps {
  onRatingChange?: (rating: number) => void
  onDistanceChange?: (distance: number) => void
  onStatusChange?: (status: 'open' | 'all') => void
}

export function FilterPanel({
  onRatingChange,
  onDistanceChange,
  onStatusChange,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    rating: true,
    distance: true,
    status: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-4">
      {/* Rating Filter */}
      <Card>
        <button
          onClick={() => toggleSection('rating')}
          className="flex w-full items-center justify-between text-foreground"
        >
          <h4 className="font-semibold">Rating</h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.rating ? '' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.rating && (
          <div className="mt-4 space-y-3">
            {[5, 4, 3, 2].map((rating) => (
              <label key={rating} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  onChange={(e) => onRatingChange?.(Number(e.target.value))}
                  className="h-4 w-4"
                />
                <span className="text-sm text-foreground">
                  {rating}★ & Up
                </span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Distance Filter */}
      <Card>
        <button
          onClick={() => toggleSection('distance')}
          className="flex w-full items-center justify-between text-foreground"
        >
          <h4 className="font-semibold">Distance</h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.distance ? '' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.distance && (
          <div className="mt-4 space-y-3">
            {[
              { label: 'Within 1 km', value: 1 },
              { label: 'Within 5 km', value: 5 },
              { label: 'Within 10 km', value: 10 },
              { label: 'Within 25 km', value: 25 },
            ].map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="distance"
                  value={option.value}
                  onChange={(e) => onDistanceChange?.(Number(e.target.value))}
                  className="h-4 w-4"
                />
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Status Filter */}
      <Card>
        <button
          onClick={() => toggleSection('status')}
          className="flex w-full items-center justify-between text-foreground"
        >
          <h4 className="font-semibold">Open Now</h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expandedSections.status ? '' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.status && (
          <div className="mt-4 space-y-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="status"
                value="open"
                onChange={(e) => onStatusChange?.(e.target.value as 'open' | 'all')}
                className="h-4 w-4"
              />
              <span className="text-sm text-foreground">Open Now</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="status"
                value="all"
                defaultChecked
                onChange={(e) => onStatusChange?.(e.target.value as 'open' | 'all')}
                className="h-4 w-4"
              />
              <span className="text-sm text-foreground">All Businesses</span>
            </label>
          </div>
        )}
      </Card>
    </div>
  )
}

