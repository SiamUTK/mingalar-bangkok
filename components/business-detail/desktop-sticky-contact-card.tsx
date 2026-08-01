'use client'

import { Card, CardContent, CardHeader } from '@/components/ui'
import { Phone, MapPin, Share2, Flag } from 'lucide-react'
import { Button } from '@/components/ui'
import { useState } from 'react'

export interface DesktopStickyContactCardProps {
  businessName: string
  phone: string
  address: string
  isSaved?: boolean
  onCall: () => void
  onGetDirections: () => void
  onShare: () => void
  onReport: () => void
  onSave?: () => void
}

export function DesktopStickyContactCard({
  businessName,
  phone,
  address,
  isSaved = false,
  onCall,
  onGetDirections,
  onShare,
  onReport,
  onSave,
}: DesktopStickyContactCardProps) {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    setSaved(!saved)
    onSave?.()
  }

  return (
    <Card className="sticky top-20 hidden md:block">
      <CardHeader>
        <h3 className="font-semibold text-sm truncate">{businessName}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {phone}
          </p>
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </p>
        </div>

        <div className="space-y-2 border-t pt-3">
          <Button
            size="sm"
            fullWidth
            onClick={onCall}
          >
            Call
          </Button>
          <Button
            size="sm"
            variant="secondary"
            fullWidth
            onClick={onGetDirections}
          >
            Get Directions
          </Button>
        </div>

        <div className="flex gap-1 border-t pt-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            className="flex-1"
            title={saved ? 'Unsave' : 'Save'}
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onShare}
            className="flex-1"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onReport}
            className="flex-1"
            title="Report"
          >
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

