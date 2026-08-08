"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plane,
  Clock,
  Lock,
  Search,
  Bell,
  CheckCircle2,
  
  ArrowRight,
  Bot,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const travelCategories = [
  "All Services",
  "Bus Routes",
  "Flight Booking",
  "Border Passes",
  "Airport Transfer",
];

const mockTravelServices = [
  {
    id: "1",
    title: "Bangkok to Mae Sot Express Bus & Border Pass Guide",
    category: "Bus Routes",
    duration: "7 - 8 Hours",
    price: "฿450 - ฿650",
    description:
      "Direct VIP express bus ticketing and required border crossing documentation checklist for travel between Bangkok (Mochit) and Mae Sot.",
    badge: "Popular Route",
  },
  {
    id: "2",
    title: "Bangkok (BKK) to Yangon (RGN) Flight Booking & Assistance",
    category: "Flight Booking",
    duration: "1 Hour 15 Mins",
    price: "฿2,200+",
    description:
      "Fast-track flight reservations with full luggage policy guidance, immigration form prep, and transit rules for foreign travelers.",
    badge: "Best Rate",
  },
  {
    id: "3",
    title: "Suvarnabhumi / Don Mueang Airport Shuttle & Private Van",
    category: "Airport Transfer",
    duration: "Flexible",
    price: "฿800+",
    description:
      "24/7 private van and transfer bookings with Burmese and Thai-speaking drivers for group or family airport pickups.",
    badge: "24/7 Service",
  },
  {
    id: "4",
    title: "Ranong to Kawthaung Border Crossing Transit Pass",
    category: "Border Passes",
    duration: "Same Day",
    price: "฿300 - ฿500",
    description:
      "Complete guide for boat crossings, temporary border pass stamps, and legal document requirements at Ranong immigration checkpoints.",
    badge: "Essential",
  },
];

export default function TravelPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const isAuthenticated = false; // guest status simulation

  const handleLockedAction = (actionName: string) => {
    if (!isAuthenticated) {
      toast(`Sign in to ${actionName}`, {
        description: `Please create a free account to ${actionName.toLowerCase()} and access exclusive transit schedules.`,
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
    }
  };

  const filteredServices = mockTravelServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "All Services" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Plane className="h-3.5 w-3.5" /> Travel & Transportation
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Travel & Flight Assistance
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Book flights, express bus routes, border transit passes, and airport transfers safely
              across Thailand and Myanmar.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search routes or travel services (e.g., Mae Sot, Yangon, Flight)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
            <Button
              onClick={() => handleLockedAction("Set Travel Alert")}
              className="h-11 rounded-2xl font-bold text-xs bg-sky-500 hover:bg-sky-600 text-white shrink-0"
            >
              <Bell className="mr-1.5 h-4 w-4" /> Travel Expiry Alerts
            </Button>
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
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border border-border/80 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Main Travel Services Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 text-[10px] font-bold text-sky-600">
                    {service.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {service.category}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-muted/30 p-3 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                    <span>
                      Duration: <strong className="text-foreground">{service.duration}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                    <span>
                      Price: <strong className="text-foreground">{service.price}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-2 pt-4 border-t border-border/40">
                <Button
                  onClick={() => handleLockedAction("Book Route")}
                  size="sm"
                  className="flex-1 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  View Schedule & Book
                </Button>
                <Button
                  onClick={() => handleLockedAction("Consult AI on Travel")}
                  variant="outline"
                  size="sm"
                  className="rounded-xl px-3"
                >
                  <Lock className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Assistant Callout Banner */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Bot className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Need Custom Routes or Flight Schedules?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Ask Mingalar AI for instant travel routes, luggage guidelines, and real-time transit
            rules in Burmese, Thai, & English.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/ai">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Ask Mingalar AI Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-2xl font-semibold">
                Contact Travel Agent
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
