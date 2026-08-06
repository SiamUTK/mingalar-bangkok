"use client";

import * as React from "react";
import { Search, ArrowUpLeft } from "lucide-react";

export interface Suggestion {
  id: string;
  text: string;
  category?: string;
}

export interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  onSelectSuggestion: (suggestion: Suggestion) => void;
  className?: string;
}

export function SearchSuggestions({
  suggestions,
  onSelectSuggestion,
  className,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelectSuggestion(suggestion)}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{suggestion.text}</span>
            {suggestion.category && (
              <span className="rounded-md bg-muted-foreground/10 px-2 py-0.5 text-xs text-muted-foreground shrink-0">
                {suggestion.category}
              </span>
            )}
          </div>
          <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-60" />
        </button>
      ))}
    </div>
  );
}
