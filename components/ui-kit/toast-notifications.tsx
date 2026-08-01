'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastNotificationsProps {
  toasts: Toast[]
  onRemove: (id: string) => void
  className?: string
}

function getToastIcon(type: ToastType) {
  const iconClass = 'h-5 w-5'
  switch (type) {
    case 'success':
      return <CheckCircle2 className={cn(iconClass, 'text-green-600')} />
    case 'error':
      return <AlertCircle className={cn(iconClass, 'text-destructive')} />
    case 'warning':
      return <AlertTriangle className={cn(iconClass, 'text-warning')} />
    case 'info':
      return <Info className={cn(iconClass, 'text-blue-600')} />
  }
}

function getToastBg(type: ToastType) {
  switch (type) {
    case 'success':
      return 'bg-green-50 border border-green-200'
    case 'error':
      return 'bg-destructive/10 border border-destructive/30'
    case 'warning':
      return 'bg-warning/10 border border-warning/30'
    case 'info':
      return 'bg-blue-50 border border-blue-200'
  }
}

export function ToastNotifications({
  toasts,
  onRemove,
  className,
}: ToastNotificationsProps) {
  return (
    <div className={cn('fixed bottom-4 right-4 space-y-3 z-50', className)}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!toast.duration) return

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, toast.duration)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg p-4 max-w-sm shadow-lg transition-opacity',
        getToastBg(toast.type),
        !isVisible && 'opacity-0',
      )}
    >
      {getToastIcon(toast.type)}
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{toast.title}</h4>
        {toast.message && (
          <p className="text-xs text-muted-foreground mt-1">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onRemove(toast.id), 300)
        }}
        className="p-1 hover:bg-black/5 rounded"
        aria-label="Close toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

