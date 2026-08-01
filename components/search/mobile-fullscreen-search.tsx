"use client";

import { useEffect } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { RecentSearches } from "./recent-searches";
import { PopularSearches } from "./popular-searches";
import { TrendingCategories } from "./trending-categories";
import { TrendingBusinesses } from "./trending-businesses";

interface MobileFullscreenSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
}

export function MobileFullscreenSearch({
  query,
  onQueryChange,
  onClose,
}: MobileFullscreenSearchProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-4">
          {query.length === 0 ? (
            <>
              <RecentSearches />
              <PopularSearches />
              <TrendingCategories />
              <TrendingBusinesses />
            </>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>Search results for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
