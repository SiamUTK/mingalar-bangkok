"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Newspaper, Search, Sparkles, BookOpen } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsCard, NewsCardProps } from "@/components/home/news/news-card";

const newsCategories = ["All", "Visa & Rules", "Jobs News", "Guides & Living", "Community News"];

const mockNewsArticles: NewsCardProps[] = [
  {
    id: "1",
    title: "Thai Immigration Updates Online 90-Day Report Rules for 2026",
    summary:
      "New simplified online procedures announced for foreign workers residing in Thailand to submit 90-day notifications.",
    date: "1 Aug 2026",
    category: "Visa & Rules",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80" },
  {
    id: "2",
    title: "Top 5 Factory Job Hubs Expanding Recruitment in Samut Sakhon",
    summary:
      "Seafood processing and manufacturing plants seeking bilingual supervisors and workers this month.",
    date: "30 Jul 2026",
    category: "Jobs News",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" },
  {
    id: "3",
    title: "How to Use Mingalar AI to Translate Documents Quickly",
    summary:
      "A practical step-by-step guide to translating official forms and workplace notices between Myanmar and Thai.",
    date: "28 Jul 2026",
    category: "Guides & Living",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" },
  {
    id: "4",
    title: "MOU Work Permit Extension Deadline Announced for Late 2026",
    summary:
      "Important notice for legal workers regarding document submission windows and required health checkups.",
    date: "22 Jul 2026",
    category: "Visa & Rules",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" },
  {
    id: "5",
    title: "Finding Affordable Housing Near BTS/MRT: Essential Tips",
    summary:
      "How to avoid common rental scams, understand Thai rental contracts, and negotiate monthly deposits.",
    date: "18 Jul 2026",
    category: "Guides & Living",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },
  {
    id: "6",
    title: "Annual Community Cultural Festival Preparation Underway in Bangkok",
    summary:
      "Organizers invite local food vendors, performers, and volunteers to participate in the upcoming festival.",
    date: "15 Jul 2026",
    category: "Community News",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = mockNewsArticles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Newspaper className="h-3.5 w-3.5" /> News & Official Updates
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Latest News & Living Guides
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Stay informed with official Thai immigration announcements, labor rights, job news,
              and community tips.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news, visa rules, or guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {newsCategories.map((cat) => (
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

      {/* News Grid */}
      <div className="container mx-auto px-6 py-12">
        {filteredNews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border/80 bg-card p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-base font-bold text-foreground">No news articles found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search query or selecting a different category.
            </p>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Want Instant News & Visa Expiry Alerts?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Create a free account to receive urgent community news, legal updates, and personalized
            90-day notifications directly on your dashboard.
          </p>
          <div className="mt-6">
            <Link href="/register">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
