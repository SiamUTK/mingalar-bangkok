'use client'

import { Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui'

export interface StickyMobileActionBarProps {
  phone: string
  address: string
  onCall: () => void
  onGetDirections: () => void
}

export function StickyMobileActionBar({
  phone,
  address,
  onCall,
  onGetDirections,
}: StickyMobileActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-border shadow-lg">
      <div className="flex gap-2 p-3">
        <Button
          onClick={onCall}
          className="flex-1 gap-2"
        >
          <Phone className="h-4 w-4" />
          Call
        </Button>
        <Button
          onClick={onGetDirections}
          variant="secondary"
          className="flex-1 gap-2"
        >
          <MapPin className="h-4 w-4" />
          Directions
        </Button>
      </div>
    </div>
  )
}

