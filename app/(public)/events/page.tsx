"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Lock,
  Bookmark,
  Ticket,
  Search,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const eventCategories = [
  "All",
  "Festivals & Culture",
  "Workshops & Legal Aid",
  "Sports & Meetups",
  "Business & Networking",
];

const mockEvents = [
  {
    id: "1",
    title: "Thingyan Water Festival Celebration 2026",
    category: "Festivals & Culture",
    date: "Sun, 12 Apr 2026",
    time: "10:00 AM - 06:00 PM",
    location: "Bangkok Cultural Center, Bangkok",
    organizer: "Myanmar Cultural Society Thailand",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    description:
      "Join the biggest Myanmar New Year water festival celebration with traditional music, food stalls, and cultural performances.",
    attendeesCount: 420,
    price: "Free Entry",
  },
  {
    id: "2",
    title: "Free Thai Language & Labor Law Workshop",
    category: "Workshops & Legal Aid",
    date: "Sat, 22 Aug 2026",
    time: "01:00 PM - 04:00 PM",
    location: "Samut Sakhon Community Hall",
    organizer: "Migrant Rights Foundation",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    description:
      "Practical Thai conversation for factory workers and vital guidance on 2026 work permit rights and welfare regulations.",
    attendeesCount: 185,
    price: "Free Registration",
  },
  {
    id: "3",
    title: "Myanmar SME & Business Networking Meetup",
    category: "Business & Networking",
    date: "Sun, 30 Aug 2026",
    time: "02:00 PM - 05:00 PM",
    location: "Silom Complex, Bangkok",
    organizer: "Mingalar Bangkok Business Hub",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    description:
      "Connect with restaurant owners, logistics providers, and tech founders operating in Thailand to explore partnerships.",
    attendeesCount: 95,
    price: "Free for Members",
  },
  {
    id: "4",
    title: "Community Futsal Tournament 2026",
    category: "Sports & Meetups",
    date: "Sun, 13 Sep 2026",
    time: "08:00 AM - 05:00 PM",
    location: "Mahachai Arena, Samut Sakhon",
    organizer: "Samut Youth Club",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    description:
      "Annual friendly futsal championship bringing together community sports teams across Bangkok and surrounding areas.",
    attendeesCount: 310,
    price: "Free Spectator",
  },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isAuthenticated = false; // guest status simulation

  const handleLockedAction = (actionName: string) => {
    if (!isAuthenticated) {
      toast(`Sign in to ${actionName}`, {
        description: `Please create a free account to ${actionName.toLowerCase()} and receive event reminders.`,
        action: {
          label: "Create Account",
          onClick: () => (window.location.href = "/register"),
        },
      });
    }
  };

  const filteredEvents = mockEvents.filter((evt) => {
    const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Calendar className="h-3.5 w-3.5" /> Community Events
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Upcoming Events & Meetups
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover cultural celebrations, legal workshops, networking meetups, and sports
              tournaments in Thailand.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {eventCategories.map((cat) => (
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

      {/* Event Cards Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="group overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg flex flex-col sm:flex-row gap-5"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/10] sm:w-52 shrink-0 overflow-hidden rounded-2xl">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] font-bold text-primary shadow-sm">
                  {evt.price}
                </span>
              </div>

              {/* Event Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-primary">{evt.category}</span>
                    <button
                      type="button"
                      onClick={() => handleLockedAction("Save Event to Calendar")}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mt-1.5 text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {evt.title}
                  </h3>

                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>
                        {evt.date} • {evt.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Users className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{evt.attendeesCount} people attending</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 flex gap-2 pt-3 border-t border-border/40">
                  <Button
                    onClick={() => handleLockedAction("Join Event & Get Ticket")}
                    size="sm"
                    className="flex-1 rounded-xl text-xs font-semibold"
                  >
                    <Ticket className="mr-1.5 h-3.5 w-3.5" />
                    Join / Register Event
                  </Button>
                  <Button
                    onClick={() => handleLockedAction("Save Event")}
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

        {/* Conversion Banner */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Host or Organize a Community Event?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Publish your cultural meetups, workshops, or sports tournaments for free and reach
            thousands of members instantly.
          </p>
          <div className="mt-6">
            <Link href="/register">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Post Your Event Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
