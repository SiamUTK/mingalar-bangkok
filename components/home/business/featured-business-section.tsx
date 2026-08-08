"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "./business-card";

const businesses = [
  {
    id: "1",
    name: "Mingalar Restaurant",
    category: "Restaurant",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
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
    <AnimatedSection className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-[#aa2429]">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Businesses
            </div>

            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl mt-3">
              Trusted Businesses
            </h2>

            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              Discover verified businesses trusted by the Myanmar community across Thailand.
            </p>
          </div>

          <Link href="/directory">
            <Button
              variant="outline"
              className="rounded-2xl border-border hover:border-[#aa2429]/50"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 text-[#aa2429]" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
