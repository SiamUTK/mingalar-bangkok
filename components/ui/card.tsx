import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  interactive?: boolean
}

export function Card({ children, className, hover = false, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-card p-6 text-card-foreground border border-border/50 shadow-md transition-all duration-300 ease-out',
        hover && 'hover:shadow-xl hover:border-border',
        interactive && 'cursor-pointer hover:shadow-xl hover:border-border hover:-translate-y-1',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4 flex flex-col space-y-1.5', className)}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>{children}</h3>
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn('flex items-center gap-4 pt-4', className)}>{children}</div>
}


