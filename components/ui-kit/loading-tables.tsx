import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingTablesProps {
  rows?: number
  columns?: number
  className?: string
}

export function LoadingTables({
  rows = 6,
  columns = 4,
  className,
}: LoadingTablesProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-border', className)}>
      {/* Header */}
      <div className="grid gap-4 border-b border-border bg-muted/50 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-20" variant="text" />
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowI) => (
          <div key={rowI} className="grid gap-4 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((_, colI) => (
              <Skeleton
                key={colI}
                className="h-4 w-full"
                variant="text"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}


