import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyHousingProps {
  onSearch?: () => void
  className?: string
}

export function EmptyHousing({
  onSearch,
  className,
}: EmptyHousingProps) {
  return (
    <div className={cn('flex min-h-80 flex-col items-center justify-center space-y-6 px-4 py-12', className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Home className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-foreground">No housing listings</h3>
        <p className="text-sm text-muted-foreground">
          Try expanding your search area or adjusting your filters to find more options
        </p>
      </div>
      {onSearch && (
        <Button onClick={onSearch} size="sm">
          Explore housing
        </Button>
      )}
    </div>
  )
}


