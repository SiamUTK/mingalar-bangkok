'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui'

export interface ContactInformationCardProps {
  phone: string
  address: string
  telegram?: string
  line?: string
  onCall: () => void
  onGetDirections: () => void
}

export function ContactInformationCard({
  phone,
  address,
  telegram,
  line,
  onCall,
  onGetDirections,
}: ContactInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-start gap-3 mb-2">
            <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Phone</p>
              <p className="text-sm font-medium">{phone}</p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={onCall}
            className="mt-2"
            fullWidth
          >
            Call Now
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start gap-3 mb-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Address</p>
              <p className="text-sm font-medium">{address}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={onGetDirections}
            className="mt-2"
            fullWidth
          >
            Get Directions
          </Button>
        </div>

        {(telegram || line) && (
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Other Contact</p>
            {telegram && (
              <a
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Telegram</span>
              </a>
            )}
            {line && (
              <a
                href={line}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                <span>LINE</span>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

