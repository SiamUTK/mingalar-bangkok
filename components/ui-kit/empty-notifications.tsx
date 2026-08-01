import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyNotificationsProps {
  className?: string
}

export function EmptyNotifications({
  className,
}: EmptyNotificationsProps) {
  return (
    <div className={cn('flex min-h-80 flex-col items-center justify-center space-y-6 px-4 py-12', className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Bell className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-foreground">No notifications</h3>
        <p className="text-sm text-muted-foreground">
          You&apos;re all caught up! Check back later for new updates
        </p>
      </div>
    </div>
  )
}

