"use client";

import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { HousingCard, HousingProperty } from "@/components/home/housing/housing-card";
import { Button } from "@/components/ui/button";

const allProperties: HousingProperty[] = [
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
  {
    id: "4",
    title: "Budget Worker Studio near Factory",
    location: "Mahachai, Samut Sakhon",
    price: "฿3,200 / month",
    bedrooms: 1,
    bathrooms: 1,
    area: "22 m²",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    featured: false,
  },
  {
    id: "5",
    title: "Spacious Room near MRT",
    location: "Huai Khwang, Bangkok",
    price: "฿6,800 / month",
    bedrooms: 1,
    bathrooms: 1,
    area: "32 m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    featured: true,
  },
  {
    id: "6",
    title: "Quiet Residence for Workers",
    location: "Bang Khun Thian, Bangkok",
    price: "฿4,500 / month",
    bedrooms: 1,
    bathrooms: 1,
    area: "26 m²",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    featured: false,
  },
];

export default function HousingPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Top Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
        </Link>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Home className="h-3.5 w-3.5" /> Accommodations
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Find Verified Housing
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Browse rooms, apartments, and condos across Thailand suited for your budget.
            </p>
          </div>

          <Link href="/register">
            <Button className="rounded-2xl font-semibold shadow-md shadow-primary/20">
              Create Account to Contact Owners
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProperties.map((property) => (
          <HousingCard key={property.id} {...property} />
        ))}
      </div>

      {/* Conversion Banner at Bottom */}
      <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-primary/10 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-foreground">
          Need help contacting property owners?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Sign up for free to unlock direct phone numbers, LINE IDs, and send instant inquiries to
          landlords.
        </p>
        <div className="mt-6">
          <Link href="/register">
            <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
