'use client'

import { Card, Badge } from '@/components/ui'
import { Button } from '@/components/ui/button-variants'
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface FeaturedBusinessCardProps {
  id: string
  name: string
  category: string
  image: string
  logo: string
  rating: number
  reviewCount: number
  address: string
  distance: number
  description: string
  isVerified: boolean
  badge?: string
  isSaved?: boolean
  onSave?: (id: string) => void
  onViewDetails?: (id: string) => void
}

export function FeaturedBusinessCard({
  id,
  name,
  category,
  image,
  logo,
  rating,
  reviewCount,
  address,
  distance,
  description,
  isVerified,
  badge,
  isSaved: initialSaved = false,
  onSave,
  onViewDetails,
}: FeaturedBusinessCardProps) {
  const [isSaved, setIsSaved] = useState(initialSaved)

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.(id)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-64 md:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-secondary text-foreground font-semibold">
                {badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-6">
          <div>
            {/* Name & Actions */}
            <div className="mb-4 flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={logo}
                    alt={`${name} logo`}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-foreground">{name}</h3>
                      {isVerified && (
                        <svg
                          className="h-4 w-4 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{category}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart
                  className="h-5 w-5"
                  fill={isSaved ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating)
                        ? 'fill-secondary text-secondary'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{rating}</span>
              <span className="text-xs text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>

            {/* Address */}
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <p>{address}</p>
                <p className="text-xs">{distance} km away</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className="mt-4 w-full"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => onViewDetails?.(id)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}


