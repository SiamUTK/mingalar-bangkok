// components/home/business/business-card.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Store, Utensils, ShoppingBag, Coffee } from "lucide-react";

export interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  image?: string;
  location: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  verified?: boolean;
  open?: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Restaurant: <Utensils className="h-8 w-8 text-[#aa2429]" />,
  Grocery: <ShoppingBag className="h-8 w-8 text-[#aa2429]" />,
  Cafe: <Coffee className="h-8 w-8 text-[#aa2429]" />,
};

export function BusinessCard({
  id,
  name,
  category,
  image,
  location,
  rating,
  reviewCount,
  featured = false,
  verified = false,
  open = true,
}: BusinessCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/directory/${id}`} className="block">
      <article className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#aa2429]/40 hover:shadow-xl">
        {/* Card Header Image Area */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#aa2429]/10 via-amber-500/5 to-primary/10">
          {image && !imgError ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#aa2429]/20 bg-background/90 shadow-md backdrop-blur-md">
                {categoryIcons[category] || <Store className="h-8 w-8 text-[#aa2429]" />}
              </div>
            </div>
          )}

          {/* Top Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {featured && (
              <span className="rounded-full bg-[#aa2429] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                ★ Featured
              </span>
            )}
            {verified && (
              <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-xs ${
                open ? "bg-emerald-600" : "bg-rose-600"
              }`}
            >
              {open ? "● Open Now" : "● Closed"}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              {category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-muted-foreground font-normal">({reviewCount})</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground group-hover:text-[#aa2429] transition-colors line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-[#aa2429]" />
            <span>{location}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
