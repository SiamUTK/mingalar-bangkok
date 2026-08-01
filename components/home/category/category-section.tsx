"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  House,
  Plane,
  GraduationCap,
  HeartPulse,
  CalendarDays,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { staggerContainer, staggerItem } from "@/lib/motion";

const categories = [
  {
    title: "Businesses",
    description: "Restaurants, shops, services and more",
    href: "/directory",
    count: "1,200+",
    icon: Building2,
    accent: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Jobs",
    description: "Full-time, part-time and freelance",
    href: "/jobs",
    count: "450+",
    icon: BriefcaseBusiness,
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Housing",
    description: "Rooms, condos and apartments",
    href: "/housing",
    count: "320+",
    icon: House,
    accent: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Travel",
    description: "Tours, visa and transportation",
    href: "/travel",
    count: "180+",
    icon: Plane,
    accent: "bg-sky-500/10 text-sky-600",
  },
  {
    title: "Education",
    description: "Schools and Thai language courses",
    href: "/education",
    count: "95+",
    icon: GraduationCap,
    accent: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "Healthcare",
    description: "Hospitals, clinics and pharmacies",
    href: "/healthcare",
    count: "210+",
    icon: HeartPulse,
    accent: "bg-red-500/10 text-red-600",
  },
  {
    title: "Events",
    description: "Community events and activities",
    href: "/events",
    count: "80+",
    icon: CalendarDays,
    accent: "bg-pink-500/10 text-pink-600",
  },
  {
    title: "Mingalar AI",
    description: "Ask AI anything about Thailand",
    href: "/ai-assistant",
    count: "24/7",
    icon: Sparkles,
    accent: "bg-primary/10 text-primary",
  },
];

export function CategorySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Explore
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight">Browse by Category</h2>

            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Discover trusted businesses, career opportunities, accommodation, travel services and
              community resources.
            </p>
          </div>

          <Link
            href="/directory"
            className="inline-flex items-center gap-2 font-medium text-primary transition hover:gap-3"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div key={category.title} variants={staggerItem}>
                <Link
                  href={category.href}
                  className="group block rounded-3xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
                >
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${category.accent}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{category.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {category.count}
                    </span>

                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
