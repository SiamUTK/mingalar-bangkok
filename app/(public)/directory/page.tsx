"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  Star,
  Search,
  Filter,
  Lock,
  Heart,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "Restaurants & Food",
  "Shops & Markets",
  "Healthcare & Clinics",
  "Logistics & Cargo",
  "Beauty & Salons",
];

const mockBusinesses = [
  {
    id: "1",
    name: "Sai's Myanmar Kitchen",
    category: "Restaurants & Food",
    location: "Pratunam, Bangkok",
    rating: 4.8,
    reviewsCount: 124,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    description:
      "Authentic Shan noodles, Mohinga, and traditional Myanmar curries in central Bangkok.",
    phone: "+66 81 234 5678",
    verified: true,
  },
  {
    id: "2",
    name: "Shwe Myanmar Express Cargo",
    category: "Logistics & Cargo",
    location: "Samut Sakhon",
    rating: 4.9,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    description: "Reliable parcel and door-to-door delivery service between Thailand and Myanmar.",
    phone: "+66 89 876 5432",
    verified: true,
  },
  {
    id: "3",
    name: "Mandalay Convenience Store",
    category: "Shops & Markets",
    location: "Huai Khwang, Bangkok",
    rating: 4.7,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    description: "Imported Myanmar snacks, tea mix, spices, and everyday household products.",
    phone: "+66 92 111 2233",
    verified: false,
  },
  {
    id: "4",
    name: "Mingalar Dental & Health Clinic",
    category: "Healthcare & Clinics",
    location: "Mahachai, Samut Sakhon",
    rating: 4.9,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    description: "Bilingual healthcare support and general checkups for the Myanmar community.",
    phone: "+66 87 999 8877",
    verified: true,
  },
];

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isAuthenticated = false; // guest status simulation

  const handleLockedAction = (actionName: string) => {
    if (!isAuthenticated) {
      toast(`Sign in to ${actionName}`, {
        description: `Please create a free account to ${actionName.toLowerCase()} and access full business contacts.`,
        action: {
          label: "Create Account",
          onClick: () => (window.location.href = "/register"),
        },
      });
    }
  };

  const filteredBusinesses = mockBusinesses.filter((b) => {
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection className="border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Store className="h-3.5 w-3.5" /> Business Directory
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Myanmar Businesses in Thailand
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover verified restaurants, shops, clinics, cargo services, and local stores near
              you.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by business name, food, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
          </div>

          {/* Categories Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/80 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Directory Listings Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="group overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg flex flex-col sm:flex-row gap-5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] sm:w-44 shrink-0 overflow-hidden rounded-2xl">
                <img
                  src={biz.image}
                  alt={biz.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {biz.verified && (
                  <span className="absolute left-2 top-2 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    Verified
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-primary">{biz.category}</span>
                    <button
                      type="button"
                      onClick={() => handleLockedAction("Save Favorite Business")}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-rose-500 transition"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mt-1 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {biz.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{biz.rating}</span>
                    </div>
                    <span>•</span>
                    <span>({biz.reviewsCount} reviews)</span>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {biz.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="line-clamp-1">{biz.location}</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 flex gap-2 pt-3 border-t border-border/40">
                  <Button
                    onClick={() => handleLockedAction("Call Business")}
                    size="sm"
                    className="flex-1 rounded-xl text-xs font-semibold"
                  >
                    <Phone className="mr-1.5 h-3.5 w-3.5" />
                    Call Phone
                  </Button>
                  <Button
                    onClick={() => handleLockedAction("View Business Page")}
                    variant="outline"
                    size="sm"
                    className="rounded-xl px-3"
                  >
                    <Lock className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Are you a Myanmar Business Owner in Thailand?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            List your store, restaurant, or service on Mingalar Bangkok for free and reach over
            50,000 community members daily.
          </p>
          <div className="mt-6">
            <Link href="/register">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Register Your Business Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
