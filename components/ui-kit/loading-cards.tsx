import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingCardsProps {
  count?: number
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function LoadingCards({
  count = 6,
  columns = 3,
  className,
}: LoadingCardsProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn(`grid grid-cols-1 gap-6 ${columnClasses[columns]}`, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border p-4 space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" variant="text" />
            <Skeleton className="h-3 w-full" variant="text" />
            <Skeleton className="h-3 w-1/2" variant="text" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

