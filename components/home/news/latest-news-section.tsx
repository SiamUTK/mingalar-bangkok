"use client";

import Link from "next/link";
import { ArrowRight, Newspaper, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: "1",
    title: "Thai Immigration Updates Online 90-Day Report Rules for 2026",
    summary: "New simplified procedures announced for foreign workers residing in Thailand.",
    date: "1 Aug 2026",
    category: "Visa & Rules",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80",
  },
  {
    id: "2",
    title: "Top 5 Factory Job Hubs Expanding Recruitment in Samut Sakhon",
    summary: "Seafood and manufacturing plants seeking bilingual supervisors this month.",
    date: "30 Jul 2026",
    category: "Jobs News",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    id: "3",
    title: "How to Use Mingalar AI to Translate Documents Quickly",
    summary: "A practical guide to translating official forms between Myanmar and Thai.",
    date: "28 Jul 2026",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
];

export function LatestNewsSection() {
  return (
    <AnimatedSection className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Newspaper className="h-3.5 w-3.5" /> News & Guides
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Latest Information & Local Updates
            </h2>
          </div>
          <Link href="/news">
            <Button variant="outline" className="rounded-2xl text-xs font-semibold">
              Read All Articles <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <div className="group overflow-hidden rounded-3xl border border-border/80 bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-bold text-primary">{item.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
