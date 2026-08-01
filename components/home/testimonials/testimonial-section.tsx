"use client";

import { ArrowRight, Quote, Star } from "lucide-react";
import Link from "next/link";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: "1",
    name: "Aung Ko",
    role: "Restaurant Supervisor",
    location: "Bangkok",
    rating: 5,
    comment:
      "Mingalar Bangkok helped me find a great job within a week. The platform is easy to use and the listings are trustworthy.",
  },
  {
    id: "2",
    name: "May Thandar",
    role: "University Student",
    location: "Chiang Mai",
    rating: 5,
    comment:
      "I found an affordable apartment near my university and discovered many Myanmar businesses nearby. Everything was in one place.",
  },
  {
    id: "3",
    name: "Ko Zaw",
    role: "Software Engineer",
    location: "Bangkok",
    rating: 5,
    comment:
      "The AI Assistant answered my questions about visas, transportation and healthcare instantly. It saved me so much time.",
  },
];

export function TestimonialSection() {
  return (
    <AnimatedSection className="bg-muted/20 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Community Stories
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Trusted by the Myanmar Community
          </h2>

          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Real stories from people using Mingalar Bangkok to find jobs, housing, trusted
            businesses and local services in Thailand.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="relative rounded-4xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />

              <div className="mb-6 flex gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="min-h-36 text-base leading-8 text-muted-foreground">
                &quot;{item.comment}&quot;
              </p>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-bold">{item.name}</h3>

                <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>

                <p className="text-sm text-primary">{item.location}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/community">
            <Button variant="outline" size="lg">
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
