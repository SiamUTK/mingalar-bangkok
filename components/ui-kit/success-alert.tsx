import { CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SuccessAlertProps {
  title: string
  message?: string
  onClose?: () => void
  className?: string
}

export function SuccessAlert({
  title,
  message,
  onClose,
  className,
}: SuccessAlertProps) {
  return (
    <div className={cn('flex gap-4 rounded-lg border border-green-200 bg-green-50 p-4', className)}>
      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-green-900">{title}</h4>
        {message && (
          <p className="text-sm text-green-800 mt-1">{message}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-green-100 rounded"
          aria-label="Close alert"
        >
          <X className="h-4 w-4 text-green-600" />
        </button>
      )}
    </div>
  )
}

