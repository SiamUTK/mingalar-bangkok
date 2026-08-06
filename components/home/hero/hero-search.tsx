"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeMotion, hoverScale, staggerContainer, staggerItem } from "@/lib/motion";

const suggestedPrompts = [
  { label: "Factory jobs", href: "/jobs?q=factory" },
  { label: "Rooms under ฿3,000", href: "/housing?maxPrice=3000" },
  { label: "Myanmar food", href: "/directory?category=restaurants" },
  { label: "Visa renewal", href: "/visa" },
  { label: "Money transfer", href: "/money" },
];

export function HeroSearch() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      variants={fadeMotion}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="rounded-3xl border border-border/60 bg-background/80 p-3 shadow-2xl backdrop-blur-xl md:rounded-4xl">
        <div className="grid gap-3 lg:grid-cols-[1.7fr_1fr_1fr_auto]">
          {/* Universal Search Input */}
          <div className="flex items-center gap-3 rounded-2xl px-4 md:rounded-3xl">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              placeholder="Search jobs, housing, businesses, visa, travel or ask AI..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm md:text-base placeholder:text-muted-foreground/70"
            />
          </div>

          {/* Category Dropdown */}
          <select className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary">
            <option value="all">All Categories</option>
            <option value="jobs">Jobs</option>
            <option value="housing">Housing</option>
            <option value="businesses">Businesses</option>
            <option value="visa">Visa Help</option>
            <option value="travel">Travel</option>
            <option value="money">Money</option>
          </select>

          {/* Location Input */}
          <div className="flex items-center gap-2 rounded-2xl border border-border px-4">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Bangkok, Samut Sakhon..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm"
            />
          </div>

          {/* Search Button */}
          <Button size="lg" className="rounded-2xl px-8 font-semibold">
            Search
          </Button>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
      >
        <span className="text-xs font-medium text-muted-foreground mr-1">Suggested:</span>

        {suggestedPrompts.map((item) => (
          <motion.div key={item.label} variants={shouldReduceMotion ? undefined : staggerItem}>
            <Link href={item.href}>
              <motion.button
                whileHover={shouldReduceMotion ? undefined : hoverScale}
                className="rounded-full border border-border/80 bg-background/90 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
              >
                {item.label}
              </motion.button>
            </Link>
          </motion.div>
        ))}

        <motion.div variants={shouldReduceMotion ? undefined : staggerItem}>
          <Link href="/ai">
            <motion.button
              whileHover={shouldReduceMotion ? undefined : hoverScale}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask Mingalar AI
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
