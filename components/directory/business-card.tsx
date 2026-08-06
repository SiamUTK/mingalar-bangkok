"use client";

import { Card, Badge } from "@/components/ui";
import { Star, MapPin, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button-variants";
import { useState } from "react";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  logo: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: number;
  isOpen: boolean;
  isVerified: boolean;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function BusinessCard({
  id,
  name,
  category,
  image,
  logo,
  rating,
  reviewCount,
  address,
  distance,
  isOpen,
  isVerified,
  isSaved: initialSaved = false,
  onSave,
  onShare,
}: BusinessCardProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="h-full w-full object-cover" />

        {/* Status Badge */}
        <div className="absolute right-2 top-2">
          <Badge variant={isOpen ? "success" : "danger"} className="text-xs">
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>

        {/* Logo */}
        <div className="absolute -bottom-4 left-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-card bg-card shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={`${name} logo`} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-10 pb-4">
        {/* Name & Verified Badge */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-foreground">{name}</h3>
              {isVerified && (
                <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
        </div>

        {/* Address */}
        <div className="mb-3 flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-foreground">{address}</p>
            <p className="text-xs text-muted-foreground">{distance} km away</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="ghost"
            className="flex-1"
            icon={<Share2 className="h-4 w-4" />}
            onClick={() => onShare?.(id)}
          >
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}

