'use client'

import { Container, Card } from '@/components/ui'
import { Zap, Shield, Smartphone, Globe } from 'lucide-react'

export interface Feature {
  id: string
  title: string
  description: string
  icon: 'zap' | 'shield' | 'smartphone' | 'globe'
}

export interface AIFeaturesProps {
  features?: Feature[]
}

const iconMap = {
  zap: Zap,
  shield: Shield,
  smartphone: Smartphone,
  globe: Globe,
}

export function AIFeatures({
  features = [
    {
      id: '1',
      title: 'Lightning Fast',
      description: 'Get responses in milliseconds with our optimized AI engine',
      icon: 'zap' as const,
    },
    {
      id: '2',
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and never shared',
      icon: 'shield' as const,
    },
    {
      id: '3',
      title: 'Works Everywhere',
      description: 'Use on desktop, tablet, or mobile seamlessly',
      icon: 'smartphone' as const,
    },
    {
      id: '4',
      title: 'Multilingual',
      description: 'Communicate in English, Thai, Burmese, and more',
      icon: 'globe' as const,
    },
  ],
}: AIFeaturesProps) {
  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground">Everything you need for productive conversations</p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon]
              return (
                <div key={feature.id} className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-2">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detailed feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50ms</div>
              <p className="text-sm text-muted-foreground">Average response time</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Data encryption</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">12+</div>
              <p className="text-sm text-muted-foreground">Languages supported</p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}

