import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'h-10 w-10 rounded-full',
    rectangular: 'h-12 w-full rounded',
    rounded: 'h-12 w-full rounded-lg',
  }

  return (
    <div
      className={cn('animate-pulse bg-muted', variantClasses[variant], className)}
      aria-hidden="true"
    />
  )
}

interface SkeletonTextProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={i === lines - 1 ? 'w-4/5' : 'w-full'}
          variant="text"
        />
      ))}
    </div>
  )
}

