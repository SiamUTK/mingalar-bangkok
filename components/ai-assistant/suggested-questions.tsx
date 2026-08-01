'use client'

import { Container, Card, Button } from '@/components/ui'
import { MessageSquare } from 'lucide-react'

export interface SuggestedQuestion {
  id: string
  question: string
  icon?: string
}

export interface SuggestedQuestionsProps {
  questions?: SuggestedQuestion[]
  onAskQuestion?: (question: string) => void
}

export function SuggestedQuestions({
  questions = [
    {
      id: '1',
      question: 'Best Thai language learning resources in Bangkok?',
    },
    {
      id: '2',
      question: 'How to start a business in Thailand as a foreigner?',
    },
    {
      id: '3',
      question: 'Top housing options near Sukhumvit area?',
    },
    {
      id: '4',
      question: 'Myanmar cultural events happening this month?',
    },
  ],
  onAskQuestion,
}: SuggestedQuestionsProps) {
  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Questions</h2>
            <p className="text-muted-foreground">Start with any of these common inquiries</p>
          </div>

          {/* Questions grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {questions.map((q) => (
              <Card key={q.id} className="p-4 hover:border-primary/50 transition-all cursor-pointer group">
                <button
                  onClick={() => onAskQuestion?.(q.question)}
                  className="w-full text-left space-y-3 h-full flex flex-col"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                      {q.question}
                    </p>
                  </div>
                </button>
              </Card>
            ))}
          </div>

          {/* View all button */}
          <div className="flex justify-center">
            <Button variant="ghost">View all suggested questions</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

