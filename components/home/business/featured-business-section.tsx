"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "./business-card";

const businesses = [
  {
    id: "1",
    name: "Mingalar Restaurant",
    category: "Restaurant",
    image: "https://picsum.photos/800/600?1",
    location: "Bangkok",
    rating: 4.9,
    reviewCount: 324,
    featured: true,
    verified: true,
    open: true,
  },
  {
    id: "2",
    name: "Golden Myanmar Grocery",
    category: "Grocery",
    image: "https://picsum.photos/800/600?2",
    location: "Samut Prakan",
    rating: 4.8,
    reviewCount: 189,
    featured: false,
    verified: true,
    open: true,
  },
  {
    id: "3",
    name: "Yangon Café",
    category: "Cafe",
    image: "https://picsum.photos/800/600?3",
    location: "Bangkok",
    rating: 4.7,
    reviewCount: 142,
    featured: true,
    verified: false,
    open: false,
  },
];

export function FeaturedBusinessSection() {
  return (
    <AnimatedSection className="section">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <div>
            <span className="section-badge">Featured Businesses</span>

            <h2 className="section-title mt-5">Trusted Businesses</h2>

            <p className="section-description">
              Discover verified businesses trusted by the Myanmar community across Thailand.
            </p>
          </div>

          <Link href="/directory">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

