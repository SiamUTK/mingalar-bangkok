"use client";

import Link from "next/link";
import Image from "next/image";

import { ArrowRight, Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const properties = [
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
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Housing
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Find Your Next Home
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Browse verified apartments, condos and rooms across Thailand for the Myanmar
              community.
            </p>
          </div>

          <Link href="/housing">
            <Button variant="outline">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Property Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="group overflow-hidden rounded-4xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width:768px)100vw,33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {property.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Featured
                  </span>
                )}

                <button
                  type="button"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-5 p-6">
                <div>
                  <h3 className="line-clamp-1 text-2xl font-bold">{property.title}</h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {property.location}
                  </div>
                </div>

                <div className="text-2xl font-black text-primary">{property.price}</div>

                <div className="grid grid-cols-3 gap-3 rounded-2xl bg-muted p-4">
                  <div className="text-center">
                    <BedDouble className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 text-sm font-medium">{property.bedrooms} Bed</div>
                  </div>

                  <div className="text-center">
                    <Bath className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 text-sm font-medium">{property.bathrooms} Bath</div>
                  </div>

                  <div className="text-center">
                    <Ruler className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 text-sm font-medium">{property.area}</div>
                  </div>
                </div>

                <Link href={`/housing/${property.id}`}>
                  <Button className="w-full">View Property</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/housing">
            <Button size="lg">Browse All Housing</Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
