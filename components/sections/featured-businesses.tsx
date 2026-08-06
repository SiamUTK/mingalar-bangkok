'use client'

import { Container, Card, CardContent, CardHeader, CardTitle, Avatar, Badge, Button } from '@/components/ui'
import { Star, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export interface Business {
  id: string
  name: string
  category: string
  location: string
  rating: number
  reviews: number
  description: string
  image?: string
  initials: string
  verified?: boolean
  featured?: boolean
}

export interface FeaturedBusinessesProps {
  businesses?: Business[]
  title?: string
  subtitle?: string
  onViewMore?: () => void
}

const DEFAULT_BUSINESSES: Business[] = [
  {
    id: '1',
    name: "Sai's Myanmar Kitchen",
    category: 'Restaurant',
    location: 'Bangkok, Sukhumvit',
    rating: 4.8,
    reviews: 324,
    description: 'Authentic Myanmar cuisine in the heart of Bangkok',
    initials: 'SM',
    verified: true,
    featured: true },
  {
    id: '2',
    name: 'Myanmar Tech Solutions',
    category: 'IT Services',
    location: 'Bangkok, Silom',
    rating: 4.6,
    reviews: 156,
    description: 'Professional software development and consulting',
    initials: 'MTS',
    verified: true,
    featured: true },
  {
    id: '3',
    name: 'Golden Mandalay Travel',
    category: 'Travel Agency',
    location: 'Bangkok, Pratunam',
    rating: 4.7,
    reviews: 298,
    description: 'Tour packages and travel assistance for Myanmar',
    initials: 'GMT',
    verified: true,
    featured: true },
  {
    id: '4',
    name: 'Thai Learning Hub',
    category: 'Education',
    location: 'Bangkok, Online',
    rating: 4.9,
    reviews: 512,
    description: 'Personalized Thai language courses for expats',
    initials: 'TLH',
    verified: true,
    featured: true },
]

export function FeaturedBusinesses({
  businesses = DEFAULT_BUSINESSES,
  title = 'Featured Businesses',
  subtitle = 'Discover trusted businesses from our Myanmar community',
  onViewMore = () => {} }: FeaturedBusinessesProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <Container>
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {subtitle}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onViewMore}
              className="mt-6 md:mt-0 w-fit"
            >
              View All
            </Button>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business, i) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card hover interactive className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <Avatar alt={business.name} fallback={business.initials} size="lg" />
                  {business.verified && (
                    <Badge variant="success" size="md">
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Business Name */}
                <div>
                  <CardTitle className="text-lg leading-tight">
                    {business.name}
                  </CardTitle>
                  <p className="text-sm text-secondary font-medium mt-1">
                    {business.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {business.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 py-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(business.rating)
                            ? 'fill-secondary text-secondary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {business.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({business.reviews})
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  {business.location}
                </div>

                {/* View Button */}
                <Button variant="secondary" size="sm" className="w-full mt-2">
                  View Profile
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

