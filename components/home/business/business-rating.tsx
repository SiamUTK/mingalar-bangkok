"use client";

import { Star } from "lucide-react";

export interface BusinessRatingProps {
  rating: number;
  reviewCount: number;
}

export function BusinessRating({ rating, reviewCount }: BusinessRatingProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

      <span className="font-semibold">{rating.toFixed(1)}</span>

      <span className="text-sm text-muted-foreground">({reviewCount.toLocaleString()})</span>
    </div>
  );
}

