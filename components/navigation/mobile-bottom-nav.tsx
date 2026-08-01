'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface BottomNavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface MobileBottomNavProps {
  items: BottomNavItem[]
  className?: string
}

export function MobileBottomNav({ items, className }: MobileBottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card md:hidden',
        className,
      )}
    >
      <div className="flex h-20 items-stretch justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground active:bg-muted',
              )}
            >
              <span className={cn('flex h-6 w-6 items-center justify-center', isActive && 'text-primary')}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

