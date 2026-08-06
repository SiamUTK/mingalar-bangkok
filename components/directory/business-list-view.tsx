"use client";

import { Card, Badge } from "@/components/ui";
import { Button } from "@/components/ui/button-variants";
import { Star, Heart, Share2 } from "lucide-react";
import { useState } from "react";

export interface Business {
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
}

interface BusinessListViewProps {
  businesses: Business[];
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function BusinessListView({ businesses, onSave, onShare }: BusinessListViewProps) {
  const [savedItems, setSavedItems] = useState<Set<string>>(
    new Set(businesses.filter((b) => b.isSaved).map((b) => b.id))
  );

  const handleSave = (id: string) => {
    const newSaved = new Set(savedItems);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedItems(newSaved);
    onSave?.(id);
  };

  return (
    <div className="space-y-4">
      {businesses.map((business) => (
        <Card key={business.id} interactive className="overflow-hidden">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Image & Basic Info */}
            <div className="flex gap-4 flex-1">
              {/* Logo */}
              <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img                   src={business.logo}
                  alt={business.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{business.name}</h3>
                  {business.isVerified && (
                    <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <Badge size="sm" variant="secondary">
                    {business.category}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mb-2">{business.address}</p>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(business.rating)
                            ? "fill-secondary text-secondary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-medium text-foreground ml-1">
                      {business.rating} ({business.reviewCount})
                    </span>
                  </div>

                  {/* Distance */}
                  <span className="text-xs text-muted-foreground">{business.distance} km away</span>

                  {/* Status */}
                  <Badge
                    size="sm"
                    variant={business.isOpen ? "success" : "danger"}
                    className="text-xs"
                  >
                    {business.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 md:flex-col md:items-end">
              <Button
                size="sm"
                variant="ghost"
                icon={
                  <Heart
                    className="h-4 w-4"
                    fill={savedItems.has(business.id) ? "currentColor" : "none"}
                  />
                }
                onClick={() => handleSave(business.id)}
              />
              <Button
                size="sm"
                variant="ghost"
                icon={<Share2 className="h-4 w-4" />}
                onClick={() => onShare?.(business.id)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
