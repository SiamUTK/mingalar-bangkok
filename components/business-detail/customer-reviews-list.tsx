'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ReviewCard, ReviewCardProps } from './review-card'
import { Button } from '@/components/ui'

export interface CustomerReviewsListProps {
  reviews: ReviewCardProps[]
  totalReviews: number
  onLoadMore?: () => void
  hasMore?: boolean
}

export function CustomerReviewsList({
  reviews,
  totalReviews,
  onLoadMore,
  hasMore = false,
}: CustomerReviewsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews ({totalReviews})</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <>
              {reviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
              {hasMore && (
                <Button
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={onLoadMore}
                >
                  Load More Reviews
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
