'use client'

import { Container } from '@/components/ui'
import { Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    label: string
    onClick?: () => void
  }
  secondaryCTA?: {
    label: string
    onClick?: () => void
  }
  backgroundImage?: string
  backgroundGradient?: string
}

export function HeroSection({
  title = 'Welcome to Mingalar Bangkok',
  subtitle = 'Your Gateway to Myanmar Community',
  description = 'Connect with thousands of Myanmar nationals living and working in Thailand. Find jobs, housing, businesses, and build your community.',
  primaryCTA = { label: 'Explore Now', onClick: () => {} },
  secondaryCTA = { label: 'Learn More', onClick: () => {} },
  backgroundGradient = 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(30, 58, 95, 0.1) 100%)',
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: backgroundGradient || backgroundImage,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Myanmar-inspired pattern */}
        <div className="absolute inset-0 opacity-3">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="myanmar-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="url(#grad)" opacity="0.1" />
                <path d="M50 20 L60 40 L45 40 Z" fill="currentColor" opacity="0.05" />
              </pattern>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C62828" />
                <stop offset="100%" stopColor="#1E3A5F" />
              </linearGradient>
            </defs>
            <rect width="1200" height="800" fill="url(#myanmar-pattern)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          className="py-20 md:py-32 text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Subtitle Badge */}
          <motion.div className="inline-block mb-8" variants={itemVariants}>
            <span className="px-4 py-2 bg-secondary bg-opacity-20 text-primary rounded-full text-sm font-semibold">
              🇲🇲 Myanmar Community Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="text-2xl md:text-3xl text-primary font-semibold mb-6" variants={itemVariants}>
            {subtitle}
          </motion.p>

          {/* Description */}
          <motion.p className="text-lg text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto" variants={itemVariants}>
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24" variants={itemVariants}>
            <Button
              size="lg"
              onClick={primaryCTA.onClick}
              className="min-w-fit rounded-full px-8 hover:shadow-lg transition-all duration-300"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              {primaryCTA.label}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={secondaryCTA.onClick}
              className="min-w-fit rounded-full px-8 hover:bg-secondary/10 transition-all duration-300"
            >
              {secondaryCTA.label}
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-border"
            variants={itemVariants}
          >
            {[
              { icon: '✓', label: 'Trusted Businesses', desc: 'Verified listings' },
              { icon: '✓', label: 'Jobs', desc: '3K+ opportunities' },
              { icon: '✓', label: 'Housing', desc: 'Vetted listings' },
              { icon: '✓', label: 'AI Assistant', desc: '24/7 support' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm font-semibold text-foreground mb-1">{item.icon} {item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

