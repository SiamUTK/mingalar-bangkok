'use client'

import { Star, Share2, Flag, MapPin, Phone, Globe } from 'lucide-react'
import { Button } from '@/components/ui'
import { useState } from 'react'

export interface BusinessHeroProps {
  businessName: string
  category: string
  rating: number
  reviewCount: number
  verified: boolean
  isSaved?: boolean
  onSave?: () => void
  onShare?: () => void
  onReport?: () => void
  onGetDirections?: () => void
  onCall?: () => void
  address: string
  phone: string
  website?: string
  openNow: boolean
}

export function BusinessHero({
  businessName,
  category,
  rating,
  reviewCount,
  verified,
  isSaved = false,
  onSave,
  onShare,
  onReport,
  onGetDirections,
  onCall,
  address,
  phone,
  website,
  openNow,
}: BusinessHeroProps) {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    setSaved(!saved)
    onSave?.()
  }

  return (
    <div className="bg-white">
      <div className="px-4 py-6 md:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{businessName}</h1>
              {verified && (
                <span className="inline-block bg-success text-white text-xs px-2 py-1 rounded-full">
                  Verified
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3">{category}</p>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="font-semibold">{rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
              </div>

              {openNow ? (
                <span className="text-sm font-medium text-success">Open now</span>
              ) : (
                <span className="text-sm font-medium text-danger">Closed</span>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{phone}</span>
              </div>
              {website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {website}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant={saved ? 'primary' : 'ghost'}
              onClick={handleSave}
            >
              {saved ? 'Saved' : 'Save'}
            </Button>
            <Button size="sm" variant="ghost" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 border-t pt-4">
          <Button size="sm" onClick={onGetDirections}>
            Get Directions
          </Button>
          <Button size="sm" onClick={onCall}>
            Call
          </Button>
          <Button size="sm" variant="ghost" onClick={onReport}>
            <Flag className="h-4 w-4" />
            Report
          </Button>
        </div>
      </div>
    </div>
  )
}


