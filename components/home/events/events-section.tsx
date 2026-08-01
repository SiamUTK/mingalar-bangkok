"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CalendarDays, Clock3, Heart, MapPin, Users } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: "1",
    title: "Myanmar Food Festival",
    location: "Bangkok",
    date: "24 Aug 2026",
    time: "10:00 AM",
    attendees: 542,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "Career Networking Night",
    location: "Silom",
    date: "28 Aug 2026",
    time: "6:30 PM",
    attendees: 187,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    featured: false,
  },
  {
    id: "3",
    title: "Thai Language Workshop",
    location: "Chatuchak",
    date: "30 Aug 2026",
    time: "1:00 PM",
    attendees: 96,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    featured: true,
  },
];

export function EventsSection() {
  return (
    <AnimatedSection className="bg-muted/20 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Community Events
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Upcoming Events</h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Meet new people, grow your network, and join community activities happening across
              Thailand.
            </p>
          </div>

          <Link href="/events">
            <Button variant="outline">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Event Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-4xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width:768px)100vw,33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {event.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Featured
                  </span>
                )}

                <button
                  type="button"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
                  aria-label="Save event"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-5 p-6">
                <div>
                  <h3 className="line-clamp-2 text-2xl font-bold">{event.title}</h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl bg-muted p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Clock3 className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <Link href={`/events/${event.id}`}>
                  <Button className="w-full">View Event</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/events">
            <Button size="lg">Explore All Events</Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
