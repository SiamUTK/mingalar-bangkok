'use client'

import { Container, Section } from '@/components/ui'
import { BusinessCard } from '@/components/directory'

export interface SimilarBusiness {
  id: string
  name: string
  image: string
  logo: string
  rating: number
  reviewCount: number
  distance: string
  address: string
  category: string
  verified: boolean
  isSaved?: boolean
}

export interface SimilarBusinessesProps {
  businesses: SimilarBusiness[]
}

export function SimilarBusinesses({ businesses }: SimilarBusinessesProps) {
  if (!businesses.length) return null

  return (
    <Section spacing="lg">
      <Container>
        <h2 className="text-2xl font-bold mb-6">Similar Businesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              id={business.id}
              name={business.name}
              image={business.image}
              logo={business.logo}
              rating={business.rating}
              reviewCount={business.reviewCount}
              distance={parseFloat(business.distance) || 0}
              address={business.address}
              category={business.category}
              isOpen={true}
              isVerified={business.verified}
              isSaved={business.isSaved}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}


