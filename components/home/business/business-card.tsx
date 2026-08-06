"use client";

import Image from "next/image";
import Link from "next/link";

import { BadgeCheck, Clock3, Crown, Heart, MapPin } from "lucide-react";

import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";

import { BusinessRating } from "./business-rating";

export interface BusinessCardProps {
  id: string;

  name: string;

  category: string;

  image: string;

  location: string;

  rating: number;

  reviewCount: number;

  featured?: boolean;

  verified?: boolean;

  open?: boolean;
}

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
  open = false,
}: BusinessCardProps) {
  return (
    <AnimatedCard className="group overflow-hidden rounded-4xl border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl">
      <Link href={`/directory/${id}`}>
        {/* Cover */}
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px)100vw,33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                <Crown className="h-3.5 w-3.5" />
                Featured
              </span>
            )}

            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
          </div>

          {/* Favorite */}
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Open Status */}
          <div className="absolute bottom-4 left-4">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                open ? "bg-emerald-600" : "bg-red-600"
              }`}
            >
              <Clock3 className="h-3.5 w-3.5" />

              {open ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{category}</span>

            <BusinessRating rating={rating} reviewCount={reviewCount} />
          </div>

          <div>
            <h3 className="line-clamp-1 text-2xl font-bold">{name}</h3>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />

              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          <Button className="w-full">View Details</Button>
        </div>
      </Link>
    </AnimatedCard>
  );
}

