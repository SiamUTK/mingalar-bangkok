"use client";

import { Star, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const reviews = [
  {
    name: "Aung Kyaw",
    role: "Factory Supervisor • Samut Sakhon",
    comment:
      "Mingalar AI helped me translate my workplace documents and renew my 90-day report without stress!",
    rating: 5,
  },
  {
    name: "May Thu",
    role: "Hotel Receptionist • Bangkok",
    comment:
      "Found my current apartment near BTS On Nut within 2 days of searching. Highly recommended for Myanmar workers!",
    rating: 5,
  },
  {
    name: "Zaw Min",
    role: "Business Owner • Mahachai",
    comment:
      "The best super app for our community in Thailand. Daily exchange rates and visa reminders are extremely helpful.",
    rating: 5,
  },
];

export function TestimonialSection() {
  return (
    <AnimatedSection className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Trusted by the Myanmar Community
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            See how Mingalar Bangkok helps thousands of members live and work comfortably in
            Thailand.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground italic">"{rev.comment}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{rev.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
