import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Main app layout wrapper for full-screen layouts
 * Provides consistent spacing and background
 */
export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {children}
    </div>
  )
}

interface AppHeaderProps {
  children: ReactNode
  className?: string
  sticky?: boolean
}

/**
 * App header component with optional sticky positioning
 */
export function AppHeader({ children, className, sticky = true }: AppHeaderProps) {
  return (
    <header
      className={cn(
        'border-b border-border bg-card',
        sticky && 'sticky top-0 z-40',
        className,
      )}
    >
      {children}
    </header>
  )
}

interface AppContentProps {
  children: ReactNode
  className?: string
}

/**
 * Main content area for app layouts
 */
export function AppContent({ children, className }: AppContentProps) {
  return (
    <main className={cn('flex-1', className)}>
      {children}
    </main>
  )
}

interface AppSidebarProps {
  children: ReactNode
  className?: string
}

/**
 * Sidebar component for app layouts
 */
export function AppSidebar({ children, className }: AppSidebarProps) {
  return (
    <aside className={cn('bg-card', className)}>
      {children}
    </aside>
  )
}

interface AppFooterProps {
  children: ReactNode
  className?: string
}

/**
 * App footer component
 */
export function AppFooter({ children, className }: AppFooterProps) {
  return (
    <footer className={cn('border-t border-border bg-card', className)}>
      {children}
    </footer>
  )
}


