"use client";

import { useEffect } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { RecentSearches } from "./recent-searches";
import { PopularSearches } from "./popular-searches";
import { TrendingCategories } from "./trending-categories";
import { TrendingBusinesses } from "./trending-businesses";

interface DesktopSearchModalProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
}

export function DesktopSearchModal({ query, onQueryChange, onClose }: DesktopSearchModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-card shadow-2xl">
        {/* Search Input */}
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search businesses, jobs, housing, travel..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-12 pr-10 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto p-6">
          {query.length === 0 ? (
            <div className="space-y-8">
              <RecentSearches />
              <PopularSearches />
              <TrendingCategories />
              <TrendingBusinesses />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Search results for &quot;{query}&quot; will appear here</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
