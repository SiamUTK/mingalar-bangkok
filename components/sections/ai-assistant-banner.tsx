'use client'

import { Container, Button } from '@/components/ui'
import { Sparkles, ArrowRight } from 'lucide-react'

export interface AIAssistantBannerProps {
  title?: string
  subtitle?: string
  description?: string
  features?: string[]
  ctaLabel?: string
  onCTA?: () => void
}

const DEFAULT_FEATURES = [
  'Instant job recommendations',
  'Housing search assistance',
  'Business information lookup',
  'Event recommendations',
  'Thai language tips',
]

export function AIAssistantBanner({
  title = 'AI Assistant',
  subtitle = 'Your Personal Community Guide',
  description = 'Get personalized recommendations and instant assistance powered by artificial intelligence. Ask anything about jobs, housing, businesses, or community events.',
  features = DEFAULT_FEATURES,
  ctaLabel = 'Start Chatting',
  onCTA = () => {},
}: AIAssistantBannerProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-accent via-accent/90 to-primary overflow-hidden">
      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-white opacity-3 rounded-full blur-3xl" />
          </div>

          {/* Left Content */}
          <div className="relative z-10 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full w-fit">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">AI Powered</span>
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-xl font-semibold text-white/90">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-white/80 leading-relaxed">
              {description}
            </p>

            {/* Features List */}
            <ul className="space-y-3 pt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              onClick={onCTA}
              size="lg"
              className="bg-white text-accent hover:bg-white/90 mt-4 w-full md:w-fit"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              {ctaLabel}
            </Button>
          </div>

          {/* Right Visual */}
          <div className="relative z-10 hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square">
              {/* Chat Bubble Animation Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-80 bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6 space-y-4">
                  {/* Chat Messages Skeleton */}
                  <div className="space-y-3">
                    <div className="flex gap-3 items-end">
                      <div className="w-8 h-8 rounded-full bg-white/20" />
                      <div className="w-32 h-10 rounded-lg bg-white/20" />
                    </div>
                    <div className="flex gap-3 items-end justify-end">
                      <div className="w-32 h-10 rounded-lg bg-white/30" />
                    </div>
                    <div className="flex gap-3 items-end">
                      <div className="w-8 h-8 rounded-full bg-white/20" />
                      <div className="w-40 h-10 rounded-lg bg-white/20" />
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 h-8 rounded bg-white/10" />
                      <div className="w-8 h-8 rounded bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Orbs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-10 w-48 h-48 bg-white opacity-3 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

