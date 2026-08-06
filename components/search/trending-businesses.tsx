"use client";

import * as React from "react";
import Link from "next/link";
import { Building2, Star, MapPin } from "lucide-react";

export interface TrendingBusiness {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewsCount: number;
  href: string;
}

const MOCK_TRENDING_BUSINESSES: TrendingBusiness[] = [
  {
    id: "1",
    name: "Mandalay Taste Restaurant",
    category: "Restaurants",
    location: "Pratunam, Bangkok",
    rating: 4.8,
    reviewsCount: 124,
    href: "/directory/mandalay-taste",
  },
  {
    id: "2",
    name: "Golden Land Visa Services",
    category: "Legal & Visa",
    location: "Sukhumvit, Bangkok",
    rating: 4.9,
    reviewsCount: 89,
    href: "/directory/golden-land-visa",
  },
  {
    id: "3",
    name: "Yangon Express Cargo",
    category: "Logistics",
    location: "Samut Sakhon",
    rating: 4.7,
    reviewsCount: 210,
    href: "/directory/yangon-express",
  },
];

export interface TrendingBusinessesProps {
  businesses?: TrendingBusiness[];
  onBusinessClick?: (business: TrendingBusiness) => void;
  className?: string;
}

export function TrendingBusinesses({
  businesses = MOCK_TRENDING_BUSINESSES,
  onBusinessClick,
  className,
}: TrendingBusinessesProps) {
  if (businesses.length === 0) return null;

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Trending Businesses
      </h3>
      <div className="grid gap-2 sm:grid-cols-1">
        {businesses.map((business) => (
          <Link
            key={business.id}
            href={business.href}
            onClick={() => onBusinessClick?.(business)}
            className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3 shadow-xs hover:border-primary/40 hover:bg-accent/50 transition-all"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-semibold text-foreground truncate">{business.name}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="truncate">{business.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 shrink-0">
                    <MapPin className="h-3 w-3" />
                    {business.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 shrink-0 pl-2">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <span>{business.rating}</span>
              <span className="text-muted-foreground font-normal">({business.reviewsCount})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
