"use client";

import { Briefcase, Home, Bot, FileText, Plane, Banknote, Store, Calendar } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CategoryCard } from "./category-card";

const categories = [
  {
    title: "Jobs & Careers",
    description: "Factories, hospitality, logistics & tech positions",
    count: "4,500+",
    icon: Briefcase,
    href: "/jobs",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Housing & Rooms",
    description: "Budget rooms, condos & worker apartments",
    count: "850+",
    icon: Home,
    href: "/housing",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Ask Mingalar AI",
    description: "24/7 Personal assistant for living in Thailand",
    count: "AI Active",
    icon: Bot,
    href: "/ai",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Visa & Legal Help",
    description: "90-day report, work permit & passport assistance",
    count: "Verified",
    icon: FileText,
    href: "/visa",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Travel & Flights",
    description: "Bus tickets, flights & attractions guidance",
    count: "Top Deals",
    icon: Plane,
    href: "/travel",
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Money Services",
    description: "Daily exchange rates & trusted remittance info",
    count: "Daily Rates",
    icon: Banknote,
    href: "/money",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Local Businesses",
    description: "Myanmar restaurants, shops, clinics & services",
    count: "12,000+",
    icon: Store,
    href: "/directory",
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "Community & Events",
    description: "Cultural celebrations, workshops & meetups",
    count: "Upcoming",
    icon: Calendar,
    href: "/events",
    color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  },
];

export function CategorySection() {
  return (
    <AnimatedSection className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Explore All Services
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need for living, working, and thriving in Thailand in one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
