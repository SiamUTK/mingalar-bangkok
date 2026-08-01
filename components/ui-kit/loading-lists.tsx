import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingListsProps {
  count?: number
  showAvatar?: boolean
  className?: string
}

export function LoadingLists({
  count = 8,
  showAvatar = true,
  className,
}: LoadingListsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border border-border p-4">
          {showAvatar && (
            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" variant="circular" />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" variant="text" />
            <Skeleton className="h-3 w-full" variant="text" />
            <Skeleton className="h-3 w-2/3" variant="text" />
          </div>
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      ))}
    </div>
  )
}

