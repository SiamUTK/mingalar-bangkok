import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyReviewsProps {
  onWrite?: () => void
  className?: string
}

export function EmptyReviews({
  onWrite,
  className,
}: EmptyReviewsProps) {
  return (
    <div className={cn('flex min-h-80 flex-col items-center justify-center space-y-6 px-4 py-12', className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Star className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-foreground">No reviews yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first to share your experience with this business
        </p>
      </div>
      {onWrite && (
        <Button onClick={onWrite} size="sm">
          Write a review
        </Button>
      )}
    </div>
  )
}


