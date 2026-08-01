'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Star } from 'lucide-react'

export interface ReviewsSummaryProps {
  rating: number
  totalReviews: number
  breakdown: {
    [key: number]: number
  }
}

export function ReviewsSummary({
  rating,
  totalReviews,
  breakdown,
}: ReviewsSummaryProps) {
  const getRatingPercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">{rating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mb-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? 'fill-secondary text-secondary'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = breakdown[stars] || 0
              const percentage = getRatingPercentage(count)
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-8">{stars}★</span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

