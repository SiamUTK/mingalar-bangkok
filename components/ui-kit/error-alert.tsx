import { AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorAlertProps {
  title: string
  message?: string
  onClose?: () => void
  onRetry?: () => void
  className?: string
}

export function ErrorAlert({
  title,
  message,
  onClose,
  onRetry,
  className,
}: ErrorAlertProps) {
  return (
    <div className={cn('flex gap-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4', className)}>
      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-destructive">{title}</h4>
        {message && (
          <p className="text-sm text-destructive/80 mt-1">{message}</p>
        )}
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
            aria-label="Close alert"
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        )}
      </div>
    </div>
  )
}

