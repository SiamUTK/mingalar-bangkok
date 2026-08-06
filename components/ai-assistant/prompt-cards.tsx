'use client'

import { Container, Card } from '@/components/ui'
import { Brain, Lightbulb, FileText, Code } from 'lucide-react'

export interface PromptCard {
  id: string
  title: string
  description: string
  icon: 'brain' | 'lightbulb' | 'filetext' | 'code'
}

export interface PromptCardsProps {
  cards?: PromptCard[]
  onSelectCard?: (cardId: string) => void
}

const iconMap = {
  brain: Brain,
  lightbulb: Lightbulb,
  filetext: FileText,
  code: Code,
}

export function PromptCards({
  cards = [
    {
      id: '1',
      title: 'Analyze',
      description: 'Get deep insights and analysis on any topic',
      icon: 'brain' as const,
    },
    {
      id: '2',
      title: 'Create',
      description: 'Generate creative ideas and content',
      icon: 'lightbulb' as const,
    },
    {
      id: '3',
      title: 'Write',
      description: 'Compose professional documents and copy',
      icon: 'filetext' as const,
    },
    {
      id: '4',
      title: 'Code',
      description: 'Write and debug code in multiple languages',
      icon: 'code' as const,
    },
  ],
  onSelectCard,
}: PromptCardsProps) {
  return (
    <section className="py-16 bg-muted/20">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">What can I do?</h2>
            <p className="text-muted-foreground">Explore the different ways to use AI Assistant</p>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card) => {
              const Icon = iconMap[card.icon]
              return (
                <Card
                  key={card.id}
                  className="p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => onSelectCard?.(card.id)}
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}


