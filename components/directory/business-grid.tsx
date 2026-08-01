'use client'

import { Container } from '@/components/ui'
import { BusinessCard } from './business-card'

export interface Business {
  id: string
  name: string
  category: string
  image: string
  logo: string
  rating: number
  reviewCount: number
  address: string
  distance: number
  isOpen: boolean
  isVerified: boolean
  isSaved?: boolean
}

interface BusinessGridProps {
  businesses: Business[]
  onSave?: (id: string) => void
  onShare?: (id: string) => void
  columns?: 2 | 3 | 4
}

export function BusinessGrid({
  businesses,
  onSave,
  onShare,
  columns = 3,
}: BusinessGridProps) {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }

  return (
    <div className={`grid gap-6 grid-cols-1 ${gridColsClass[columns]}`}>
      {businesses.map((business) => (
        <BusinessCard
          key={business.id}
          {...business}
          onSave={onSave}
          onShare={onShare}
        />
      ))}
    </div>
  )
}

