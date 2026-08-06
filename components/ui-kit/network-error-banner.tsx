import { AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NetworkErrorBannerProps {
  message?: string
  onRetry?: () => void
  onClose?: () => void
  className?: string
}

export function NetworkErrorBanner({
  message = 'Network error. Please check your connection and try again.',
  onRetry,
  onClose,
  className,
}: NetworkErrorBannerProps) {
  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 bg-destructive/10 border-b border-destructive/30 px-4 py-3 flex gap-3 items-center justify-between z-40',
      className,
    )}>
      <div className="flex gap-3 items-center flex-1">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
        <p className="text-sm font-medium text-destructive flex-1">{message}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Retry
          </Button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-destructive/10 rounded"
            aria-label="Close banner"
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        )}
      </div>
    </div>
  )
}


