"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CalendarDays, Clock3, Newspaper } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: "1",
    title: "New Work Permit Rules for Foreign Workers in Thailand",
    excerpt:
      "Everything you need to know about the latest work permit regulations and required documents.",
    category: "Immigration",
    date: "21 Aug 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  },
  {
    id: "2",
    title: "Top 10 Affordable Apartments Near BTS Stations",
    excerpt:
      "A curated list of affordable housing options with convenient access to public transportation.",
    category: "Housing",
    date: "19 Aug 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80",
  },
  {
    id: "3",
    title: "Best Myanmar Restaurants in Bangkok (2026 Guide)",
    excerpt: "Discover authentic Myanmar cuisine recommended by the local community.",
    category: "Food",
    date: "17 Aug 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  },
];

export function LatestNewsSection() {
  return (
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Latest Updates
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">News & Guides</h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stay informed with the latest Thailand news, immigration updates, travel guides, and
              useful resources for the Myanmar community.
            </p>
          </div>

          <Link href="/news">
            <Button variant="outline">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-4xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
            >
              {/* Cover */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width:768px)100vw,33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-5 p-6">
                <h3 className="line-clamp-2 text-2xl font-bold transition-colors group-hover:text-primary">
                  {article.title}
                </h3>

                <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{article.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Link href={`/news/${article.id}`}>
                  <Button variant="outline" className="w-full">
                    <Newspaper className="mr-2 h-4 w-4" />
                    Read Article
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/news">
            <Button size="lg">Browse All News</Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
