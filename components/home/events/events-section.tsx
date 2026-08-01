"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { EventCard } from "./event-card";

const upcomingEvents = [
  {
    id: "1",
    title: "Thingyan Water Festival Celebration 2026",
    date: "Sun, 12 Apr 2026 • 10:00 AM",
    location: "Bangkok Cultural Center",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
  },
  {
    id: "2",
    title: "Free Thai Language Workshop for Workers",
    date: "Sat, 22 Aug 2026 • 01:00 PM",
    location: "Samut Sakhon Community Hub",
    category: "Education",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    id: "3",
    title: "Myanmar SME Business Networking",
    date: "Sun, 30 Aug 2026 • 02:00 PM",
    location: "Silom, Bangkok",
    category: "Business",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
];

export function EventsSection() {
  return (
    <AnimatedSection className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Calendar className="h-3.5 w-3.5" /> Community Events
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Upcoming Events & Cultural Meetups
            </h2>
          </div>
          <Link href="/events">
            <Button variant="outline" className="rounded-2xl text-xs font-semibold">
              View All Events <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {upcomingEvents.map((evt) => (
            <EventCard key={evt.id} {...evt} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
