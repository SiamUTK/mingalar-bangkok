'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface DrawerItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: React.ReactNode
}

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: DrawerItem[]
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function MobileDrawer({
  isOpen,
  onClose,
  items,
  header,
  footer,
  className,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-card transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className,
        )}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-lg',
              'text-foreground hover:bg-muted active:bg-muted/80',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            )}
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Header Content */}
        {header && <div className="border-b border-border p-4">{header}</div>}

        {/* Navigation Items */}
        <nav className="space-y-1 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium',
                'text-foreground hover:bg-muted active:bg-muted/80',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
            >
              <span className="flex items-center gap-3">
                {item.icon && <span className="flex h-5 w-5 items-center justify-center">{item.icon}</span>}
                {item.label}
              </span>
              {item.badge && <span>{item.badge}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer Content */}
        {footer && (
          <div className="border-t border-border p-4">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

