import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptySearchStateProps {
  query?: string
  onClear?: () => void
  className?: string
}

export function EmptySearchState({
  query,
  onClear,
  className,
}: EmptySearchStateProps) {
  return (
    <div className={cn('flex min-h-80 flex-col items-center justify-center space-y-6 px-4 py-12', className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-foreground">No results found</h3>
        {query && (
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t find anything for &quot;{query}&quot;
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Try adjusting your search terms or filters
        </p>
      </div>
      {onClear && (
        <Button variant="outline" onClick={onClear} size="sm">
          Clear search
        </Button>
      )}
    </div>
  )
}

