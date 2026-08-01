'use client'

import { Container, Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import { Calendar, User, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  publishedAt: string
  views: number
  featured?: boolean
}

export interface LatestNewsProps {
  articles?: NewsArticle[]
  title?: string
  subtitle?: string
  onViewAll?: () => void
}

const DEFAULT_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Myanmar Community Celebrates Thingyan in Bangkok',
    excerpt: 'Thousands gather at Central Park to celebrate the traditional Myanmar New Year festival',
    author: 'Nay Myo',
    category: 'Events',
    publishedAt: '2024-07-28',
    views: 1243,
    featured: true,
  },
  {
    id: '2',
    title: 'New Thai-Myanmar Trade Agreement Boosts Employment',
    excerpt: 'Fresh opportunities emerge as trade barriers reduce, creating thousands of new jobs',
    author: 'Soe Win',
    category: 'Business',
    publishedAt: '2024-07-26',
    views: 856,
    featured: true,
  },
  {
    id: '3',
    title: 'Housing Market Update: Prices Rise in Key Bangkok Districts',
    excerpt: 'Real estate analysis shows 12% increase in rental prices near transportation hubs',
    author: 'Aung Kyaw',
    category: 'Housing',
    publishedAt: '2024-07-25',
    views: 634,
  },
  {
    id: '4',
    title: 'Tech Industry Hires 500 Myanmar Professionals This Quarter',
    excerpt: 'IT sector becomes largest employer for Myanmar nationals in Thailand',
    author: 'Su Mon',
    category: 'Career',
    publishedAt: '2024-07-24',
    views: 1092,
  },
  {
    id: '5',
    title: 'Cultural Education Program Launches Free Thai Language Courses',
    excerpt: 'Initiative aims to help Myanmar community integrate better through language skills',
    author: 'Thit Sa',
    category: 'Education',
    publishedAt: '2024-07-23',
    views: 542,
  },
  {
    id: '6',
    title: 'Community Forum: Women Entrepreneurs Share Success Stories',
    excerpt: 'Inspiring tales from Myanmar women building businesses in Thailand',
    author: 'Kyi Mar',
    category: 'Community',
    publishedAt: '2024-07-22',
    views: 789,
  },
]

export function LatestNews({
  articles = DEFAULT_ARTICLES,
  title = 'Latest News & Updates',
  subtitle = 'Stay informed about what\'s happening in our community',
  onViewAll = () => {},
}: LatestNewsProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'events':
        return 'bg-orange-600'
      case 'business':
        return 'bg-blue-600'
      case 'housing':
        return 'bg-purple-600'
      case 'career':
        return 'bg-primary'
      case 'education':
        return 'bg-green-600'
      case 'community':
        return 'bg-pink-600'
      default:
        return 'bg-secondary'
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <Container>
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
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
            onClick={onViewAll}
            className="mt-6 md:mt-0 w-fit"
          >
            View All News
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card hover interactive className="h-full">
                <CardHeader>
                  <Badge className={`${getCategoryColor(article.category)} w-fit text-white text-xs`}>
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg mt-4">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="space-y-2 text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        {article.views.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Read Button */}
                  <Button variant="secondary" size="sm" className="w-full mt-4">
                    Read Article
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

