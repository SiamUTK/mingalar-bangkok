'use client'

import { Container, Card, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import {
  Briefcase,
  Home,
  Store,
  MapPin,
  Calendar,
  BookOpen,
  Newspaper,
  Users } from 'lucide-react'
import { motion } from 'framer-motion'

export interface Category {
  id: string
  label: string
  icon: React.ReactNode
  count: number
  color: string
  onClick?: () => void
}

export interface CategoryGridProps {
  categories?: Category[]
  title?: string
  subtitle?: string
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'jobs',
    label: 'Jobs',
    icon: <Briefcase className="h-8 w-8" />,
    count: 3284,
    color: 'bg-primary' },
  {
    id: 'housing',
    label: 'Housing',
    icon: <Home className="h-8 w-8" />,
    count: 1856,
    color: 'bg-secondary' },
  {
    id: 'businesses',
    label: 'Businesses',
    icon: <Store className="h-8 w-8" />,
    count: 2147,
    color: 'bg-accent' },
  {
    id: 'travel',
    label: 'Travel & Tours',
    icon: <MapPin className="h-8 w-8" />,
    count: 892,
    color: 'bg-blue-600' },
  {
    id: 'events',
    label: 'Events',
    icon: <Calendar className="h-8 w-8" />,
    count: 456,
    color: 'bg-orange-600' },
  {
    id: 'learn',
    label: 'Learn Thai',
    icon: <BookOpen className="h-8 w-8" />,
    count: 145,
    color: 'bg-green-600' },
  {
    id: 'news',
    label: 'News',
    icon: <Newspaper className="h-8 w-8" />,
    count: 324,
    color: 'bg-purple-600' },
  {
    id: 'community',
    label: 'Community',
    icon: <Users className="h-8 w-8" />,
    count: 5634,
    color: 'bg-pink-600' },
]

export function CategoryGrid({
  categories = DEFAULT_CATEGORIES,
  title = 'Browse by Category',
  subtitle = 'Explore different sections of our community platform' }: CategoryGridProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <Container>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              onClick={category.onClick}
              className="h-full text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <Card hover interactive className="h-full">
                <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
                  {/* Icon Background */}
                  <div
                    className={`p-4 rounded-xl text-white flex items-center justify-center ${category.color}`}
                  >
                    {category.icon}
                  </div>

                  {/* Label */}
                  <h3 className="font-semibold text-foreground text-base leading-tight">
                    {category.label}
                  </h3>

                  {/* Count Badge */}
                  <Badge variant="secondary" size="md">
                    {category.count.toLocaleString()}
                  </Badge>
                </CardContent>
              </Card>
            </motion.button>
          ))}
        </div>
      </Container>
    </section>
  )
}


