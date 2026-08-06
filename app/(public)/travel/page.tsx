"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Sparkles, Lock, Bookmark, Search, Compass } from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const travelCategories = [
  "All",
  "Bus & Coach",
  "Flights (BKK-RGN)",
  "Border Passes",
  "Attractions & Tours",
];

const mockTravelDeals = [
  {
    id: "1",
    title: "Bangkok (Mo Chit) ↔ Mae Sot Express Bus",
    category: "Bus & Coach",
    route: "Bangkok → Mae Sot (Tak)",
    price: "฿450 - ฿680",
    duration: "approx. 7 hours",
    operator: "Siam First & Express Lines",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    description:
      "Daily comfortable VIP bus services connecting Bangkok directly to the Tak / Mae Sot border crossing.",
    verified: true,
  },
  {
    id: "2",
    title: "Bangkok (DMK) ↔ Yangon (RGN) Direct Flight",
    category: "Flights (BKK-RGN)",
    route: "Don Mueang → Yangon International",
    price: "฿2,450 / Pax",
    duration: "1 hour 15 mins",
    operator: "Regional Airlines Partner",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    description:
      "Special direct flight promotions for Myanmar workers and travelers with 20kg baggage allowance.",
    verified: true,
  },
  {
    id: "3",
    title: "Phuket & Southern Islands Weekend Trip",
    category: "Attractions & Tours",
    route: "Bangkok → Phuket",
    price: "฿1,800 / Package",
    duration: "3 Days 2 Nights",
    operator: "Mingalar Travel Partners",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
    description:
      "Budget community tour packages including roundtrip bus transit and shared beach resort stay.",
    verified: false,
  },
  {
    id: "4",
    title: "Ranong ↔ Kawthaung Border Shuttle Service",
    category: "Border Passes",
    route: "Ranong Pier → Kawthaung",
    price: "฿350 - ฿500",
    duration: "45 mins boat ride",
    operator: "Ranong Border Express",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    description:
      "Frequent daily boat shuttles and border document guidance for workers renewing pass documents.",
    verified: true,
  },
];

export default function TravelPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isAuthenticated = false; // guest status simulation

  const handleLockedAction = (actionName: string) => {
    if (!isAuthenticated) {
      toast(`Sign in to ${actionName}`, {
        description: `Please create a free account to ${actionName.toLowerCase()} and access exclusive member travel discounts.`,
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
    }
  };

  const filteredDeals = mockTravelDeals.filter((deal) => {
    const matchesCategory = selectedCategory === "All" || deal.category === selectedCategory;
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.route.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection className="border-b border-border/60 bg-linear-to-b from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600">
              <Compass className="h-3.5 w-3.5" /> Travel & Transportation
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Travel, Flights & Bus Routes
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Find reliable bus tickets, regional flights, border passes, and travel guides across
              Thailand.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search routes (e.g., Mae Sot, Yangon, Phuket)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {travelCategories.map((cat) => (
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

      {/* Travel Deals Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="group overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-lg flex flex-col sm:flex-row gap-5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] sm:w-48 shrink-0 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img                   src={deal.image}
                  alt={deal.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-background/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-sky-600 shadow-sm">
                  {deal.price}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-sky-600">{deal.category}</span>
                    <button
                      type="button"
                      onClick={() => handleLockedAction("Save Travel Route")}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-sky-600 transition"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mt-1 text-base font-bold text-foreground group-hover:text-sky-600 transition-colors line-clamp-1">
                    {deal.title}
                  </h3>

                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {deal.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      <span>{deal.route}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      <span>
                        {deal.duration} • {deal.operator}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 flex gap-2 pt-3 border-t border-border/40">
                  <Button
                    onClick={() => handleLockedAction("Book Travel Ticket")}
                    size="sm"
                    className="flex-1 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white"
                  >
                    Book / Inquiry Ticket
                  </Button>
                  <Button
                    onClick={() => handleLockedAction("View Travel Route Details")}
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
        <div className="mt-16 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Need Help Booking Flight or Group Tickets?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Ask Mingalar AI for ticket advice or contact our travel desk directly for special group
            rates and visa assistance.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/ai">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Ask Mingalar AI
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-2xl font-semibold">
                Contact Travel Desk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
