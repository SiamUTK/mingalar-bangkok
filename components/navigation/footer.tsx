'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface FooterSection {
  title: string
  links: {
    label: string
    href: string
  }[]
}

interface FooterProps {
  brand?: string
  description?: string
  sections?: FooterSection[]
  copyright?: string
  socialLinks?: {
    label: string
    href: string
    icon: React.ReactNode
  }[]
  className?: string
}

export function Footer({
  brand = 'Mingalar Bangkok',
  description = 'Connecting the Myanmar community in Thailand',
  sections = [],
  copyright = `© ${new Date().getFullYear()} Mingalar Bangkok. All rights reserved.`,
  socialLinks = [],
  className,
}: FooterProps) {
  return (
    <footer className={cn('border-t border-border bg-card', className)}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                M
              </div>
              <span className="font-semibold text-foreground">{brand}</span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-lg',
                      'text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80',
                      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    )}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-muted-foreground hover:text-primary',
                        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">{copyright}</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className={cn(
                  'text-sm text-muted-foreground hover:text-primary',
                  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                )}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={cn(
                  'text-sm text-muted-foreground hover:text-primary',
                  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                )}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

