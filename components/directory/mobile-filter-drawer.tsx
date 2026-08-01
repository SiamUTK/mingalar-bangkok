'use client'

import { useState } from 'react'
import { X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button-variants'

interface MobileFilterDrawerProps {
  open?: boolean
  onClose?: () => void
  onApply?: () => void
  children?: React.ReactNode
}

export function MobileFilterDrawer({
  open = false,
  onClose,
  onApply,
  children,
}: MobileFilterDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] transform rounded-t-3xl bg-background transition-transform duration-300 lg:hidden ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="sticky top-0 border-b border-border bg-background px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-4 py-4">
          {children}
        </div>

        <div className="sticky bottom-0 border-t border-border bg-background px-4 py-4">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={() => {
                onApply?.()
                onClose?.()
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

