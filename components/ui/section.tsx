import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'secondary' | 'accent'
}

export function Section({
  children,
  className,
  containerClassName,
  spacing = 'lg',
  background = 'default',
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-24',
    xl: 'py-20 sm:py-32',
  }

  const backgroundClasses = {
    default: 'bg-background',
    secondary: 'bg-card',
    accent: 'bg-accent text-accent-foreground',
  }

  return (
    <section className={cn(spacingClasses[spacing], backgroundClasses[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}


