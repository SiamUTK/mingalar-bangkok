'use client'

import { Container, Button } from '@/components/ui'
import { ArrowRight, Sparkles } from 'lucide-react'

export interface CTASectionProps {
  onGetStarted?: () => void
  onLearnMore?: () => void
}

export function CTASection({ onGetStarted, onLearnMore }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <Container>
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-10" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-12 md:p-16 text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Ready to get started?</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Join thousands of happy users
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Start chatting with our AI Assistant today. No signup required. No credit card needed. Just pure, powerful AI at your fingertips.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={onGetStarted} className="min-w-fit">
                Start Chatting Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" onClick={onLearnMore} className="min-w-fit">
                View Pricing
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10M+</div>
                <div className="text-xs text-muted-foreground">Users worldwide</div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground">Support available</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

