'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui'

export interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface NavbarProps {
  brand?: string
  items?: NavItem[]
  onMobileMenuToggle?: (open: boolean) => void
  className?: string
}

export function Navbar({
  brand = 'Mingalar Bangkok',
  items = [],
  onMobileMenuToggle,
  className,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen
    setMobileMenuOpen(newState)
    onMobileMenuToggle?.(newState)
  }

  const [language, setLanguage] = useState('english')

  return (
    <nav className={cn('sticky top-0 z-40 border-b border-border bg-card', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand/Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              M
            </div>
            <span className="hidden font-semibold text-foreground sm:inline">{brand}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  'text-foreground hover:text-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                )}
              >
                {item.icon && <span className="flex h-4 w-4 items-center justify-center">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Language Switcher - Desktop */}
            <div className="flex items-center border border-border rounded-lg p-1">
              <button
                onClick={() => setLanguage('myanmar')}
                className={cn(
                  'px-3 py-1 rounded text-sm font-medium transition-colors',
                  language === 'myanmar'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:text-primary',
                )}
              >
                🇲🇲
              </button>
              <button
                onClick={() => setLanguage('thai')}
                className={cn(
                  'px-3 py-1 rounded text-sm font-medium transition-colors',
                  language === 'thai'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:text-primary',
                )}
              >
                🇹🇭
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={cn(
                  'px-3 py-1 rounded text-sm font-medium transition-colors',
                  language === 'english'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:text-primary',
                )}
              >
                🇬🇧
              </button>
            </div>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg',
              'text-foreground hover:bg-muted active:bg-muted/80',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            )}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                    'text-foreground hover:bg-muted active:bg-muted/80',
                    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon && <span className="flex h-4 w-4 items-center justify-center">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Language Switcher - Mobile */}
            <div className="border-t border-border px-2 py-3">
              <p className="text-xs font-medium text-muted-foreground px-3 mb-2">Language</p>
              <div className="flex items-center border border-border rounded-lg p-1 mx-3">
                <button
                  onClick={() => setLanguage('myanmar')}
                  className={cn(
                    'flex-1 px-2 py-1 rounded text-sm font-medium transition-colors',
                    language === 'myanmar'
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:text-primary',
                  )}
                >
                  🇲🇲
                </button>
                <button
                  onClick={() => setLanguage('thai')}
                  className={cn(
                    'flex-1 px-2 py-1 rounded text-sm font-medium transition-colors',
                    language === 'thai'
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:text-primary',
                  )}
                >
                  🇹🇭
                </button>
                <button
                  onClick={() => setLanguage('english')}
                  className={cn(
                    'flex-1 px-2 py-1 rounded text-sm font-medium transition-colors',
                    language === 'english'
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:text-primary',
                  )}
                >
                  🇬🇧
                </button>
              </div>
            </div>
            <div className="border-t border-border space-y-2 px-2 py-3">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-start">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

