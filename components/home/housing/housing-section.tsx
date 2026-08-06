"use client";

import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { HousingCard, HousingProperty } from "./housing-card";

const properties: HousingProperty[] = [
  {
    id: "1",
    title: "Modern Studio Apartment",
    location: "Asok, Bangkok",
    price: "฿7,500 / month",
    bedrooms: 1,
    bathrooms: 1,
    area: "28 m²",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "Cozy Room Near BTS",
    location: "On Nut, Bangkok",
    price: "฿5,900 / month",
    bedrooms: 1,
    bathrooms: 1,
    area: "24 m²",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    featured: false,
  },
  {
    id: "3",
    title: "Family Apartment",
    location: "Rama 9, Bangkok",
    price: "฿12,000 / month",
    bedrooms: 2,
    bathrooms: 2,
    area: "55 m²",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    featured: true,
  },
];

export function HousingSection() {
  return (
    <AnimatedSection className="py-20 lg:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Accommodations
            </span>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Find Your Next Home
            </h2>

            <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              Browse verified apartments, condos, and budget rooms across Thailand for the Myanmar
              community.
            </p>
          </div>

          <Link href="/housing">
            <Button variant="outline" className="rounded-2xl font-medium">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Property Cards Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {properties.map((property) => (
            <HousingCard key={property.id} {...property} />
          ))}
        </div>

        {/* Bottom Member Register CTA */}
        <div className="mt-14 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/5 via-background to-primary/10 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Home className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Looking for a room near your workplace?
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Sign up for free to save properties, contact owners directly, and get room availability
            alerts sent to your phone.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Create Free Account
              </Button>
            </Link>

            <Link href="/housing">
              <Button size="lg" variant="outline" className="rounded-2xl font-medium">
                Browse All Housing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
