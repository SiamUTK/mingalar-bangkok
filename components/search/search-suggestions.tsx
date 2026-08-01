'use client'

import { Search } from 'lucide-react'

interface Suggestion {
  id: string
  text: string
  category?: string
  icon?: React.ReactNode
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[]
  onSuggestionClick?: (suggestion: Suggestion) => void
}

export function SearchSuggestions({ suggestions, onSuggestionClick }: SearchSuggestionsProps) {
  return (
    <div className="space-y-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSuggestionClick?.(suggestion)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
        >
          {suggestion.icon || <Search className="h-4 w-4 text-muted-foreground" />}
          <div className="flex-1 text-left">
            <p className="text-foreground">{suggestion.text}</p>
            {suggestion.category && <p className="text-xs text-muted-foreground">{suggestion.category}</p>}
          </div>
        </button>
      ))}
    </div>
  )
}

