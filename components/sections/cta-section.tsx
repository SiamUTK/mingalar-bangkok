'use client'

import { Container, Button } from '@/components/ui'
import { ArrowRight, Zap } from 'lucide-react'

export interface CTASectionProps {
  title?: string
  description?: string
  primaryCTA?: {
    label: string
    onClick?: () => void
  }
  secondaryCTA?: {
    label: string
    onClick?: () => void
  }
  backgroundGradient?: string
}

export function CTASection({
  title = 'Ready to Get Started?',
  description = 'Join thousands of Myanmar professionals and entrepreneurs building their future in Thailand. Create your free account today.',
  primaryCTA = { label: 'Create Free Account', onClick: () => {} },
  secondaryCTA = { label: 'Schedule Demo', onClick: () => {} },
  backgroundGradient = 'linear-gradient(135deg, #c62828 0%, #1e3a5f 100%)',
}: CTASectionProps) {
  return (
    <section
      className="w-full py-20 md:py-28 relative overflow-hidden"
      style={{
        background: backgroundGradient,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-white opacity-3 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full">
            <Zap className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">Limited Time Offer</span>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              onClick={primaryCTA.onClick}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              {primaryCTA.label}
            </Button>
            <Button
              onClick={secondaryCTA.onClick}
              size="lg"
              variant="ghost"
              className="text-white border border-white/50 hover:bg-white/10 w-full sm:w-auto"
            >
              {secondaryCTA.label}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6 text-white/80 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-white">50K+</div>
              <div>Active Members</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-white">3K+</div>
              <div>Job Listings</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-white">100%</div>
              <div>Free Platform</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

