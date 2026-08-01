import { AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WarningAlertProps {
  title: string
  message?: string
  onClose?: () => void
  className?: string
}

export function WarningAlert({
  title,
  message,
  onClose,
  className,
}: WarningAlertProps) {
  return (
    <div className={cn('flex gap-4 rounded-lg border border-warning/30 bg-warning/10 p-4', className)}>
      <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-warning">{title}</h4>
        {message && (
          <p className="text-sm text-warning/80 mt-1">{message}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-warning/10 rounded"
          aria-label="Close alert"
        >
          <X className="h-4 w-4 text-warning" />
        </button>
      )}
    </div>
  )
}

