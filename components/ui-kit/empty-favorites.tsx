import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyFavoritesProps {
  onBrowse?: () => void
  className?: string
}

export function EmptyFavorites({
  onBrowse,
  className,
}: EmptyFavoritesProps) {
  return (
    <div className={cn('flex min-h-80 flex-col items-center justify-center space-y-6 px-4 py-12', className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Heart className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-foreground">No favorites yet</h3>
        <p className="text-sm text-muted-foreground">
          Start saving your favorite businesses, jobs, and listings to find them quickly later
        </p>
      </div>
      {onBrowse && (
        <Button onClick={onBrowse} size="sm">
          Browse listings
        </Button>
      )}
    </div>
  )
}


