'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui'

export interface LocationMapPlaceholderProps {
  address: string
  latitude?: number
  longitude?: number
  onOpenMap: () => void
}

export function LocationMapPlaceholder({
  address,
  latitude,
  longitude,
  onOpenMap,
}: LocationMapPlaceholderProps) {
  const googleMapsUrl = latitude && longitude
    ? `https://maps.google.com/?q=${latitude},${longitude}`
    : `https://maps.google.com/maps/search/${encodeURIComponent(address)}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center gap-4 min-h-64">
          <div className="bg-muted-foreground/20 p-4 rounded-full">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-1">
              {address}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Click the button below to view on map
            </p>
          </div>
          <Button
            onClick={() => {
              window.open(googleMapsUrl, '_blank')
              onOpenMap?.()
            }}
            className="gap-2"
          >
            <MapPin className="h-4 w-4" />
            View on Map
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

