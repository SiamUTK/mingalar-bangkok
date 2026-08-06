'use client'

import { Container, Card } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

export interface Category {
  id: string
  name: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}

export interface PopularCategoriesProps {
  categories?: Category[]
  onSelectCategory?: (categoryId: string) => void
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  accent: 'bg-accent/10 text-accent border-accent/20' }

export function PopularCategories({
  categories = [
    {
      id: '1',
      name: 'Work & Career',
      description: 'Job search, resume tips, interview prep, career development',
      color: 'primary' as const },
    {
      id: '2',
      name: 'Learning Thai',
      description: 'Language tips, cultural insights, pronunciation guides',
      color: 'secondary' as const },
    {
      id: '3',
      name: 'Business',
      description: 'Starting a business, regulations, marketing strategies',
      color: 'accent' as const },
    {
      id: '4',
      name: 'Housing & Living',
      description: 'Finding apartments, neighborhood guides, utilities setup',
      color: 'primary' as const },
    {
      id: '5',
      name: 'Community',
      description: 'Events, social groups, cultural celebrations',
      color: 'secondary' as const },
    {
      id: '6',
      name: 'Travel & Tours',
      description: 'Destination guides, trip planning, local attractions',
      color: 'accent' as const },
  ],
  onSelectCategory }: PopularCategoriesProps) {
  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Categories</h2>
            <p className="text-muted-foreground">What would you like to explore today?</p>
          </div>

          {/* Categories grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`p-6 cursor-pointer hover:shadow-lg transition-all group border-2 ${colorClasses[category.color]}`}
                onClick={() => onSelectCategory?.(category.id)}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold group-hover:translate-x-1 transition-transform">{category.name}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-sm font-medium pt-2">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

