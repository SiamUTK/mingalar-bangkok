'use client'

import { Container, Card, Button } from '@/components/ui'
import { Send, Paperclip, Plus } from 'lucide-react'
import { useState } from 'react'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface ChatWindowProps {
  messages?: ChatMessage[]
  onSend?: (message: string) => void
}

export function ChatWindow({
  messages = [
    {
      id: '1',
      role: 'user',
      content: 'What are the best restaurants in Bangkok for Myanmar food?',
    },
    {
      id: '2',
      role: 'assistant',
      content:
        'I recommend several excellent Myanmar restaurants in Bangkok. Sai\'s Myanmar Kitchen is highly rated for authentic Shan noodles and curry dishes. The atmosphere is cozy and welcoming, perfect for experiencing traditional Myanmar cuisine.',
    },
    {
      id: '3',
      role: 'user',
      content: 'What are their opening hours?',
    },
    {
      id: '4',
      role: 'assistant',
      content:
        'Most Myanmar restaurants open around 11 AM for lunch service and stay open until 9-10 PM. I recommend checking their specific pages on our directory for exact hours, as they may vary by day or season.',
    },
  ],
  onSend,
}: ChatWindowProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      onSend?.(input)
      setInput('')
    }
  }

  return (
    <section className="py-16 bg-muted/20">
      <Container>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">See it in Action</h2>
            <p className="text-muted-foreground">Experience natural conversations with our AI assistant</p>
          </div>

          {/* Chat window */}
          <Card className="overflow-hidden border-2 border-primary/10">
            {/* Chat messages */}
            <div className="bg-background p-6 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none border border-border'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="bg-background border-t border-border p-4 space-y-3">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </button>
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Press Enter to send • AI Assistant always learning
              </p>
            </div>
          </Card>

          {/* New chat button */}
          <div className="flex justify-center">
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Start a new conversation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}


