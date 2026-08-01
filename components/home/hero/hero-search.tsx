"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fadeMotion,
  hoverButtonMotion,
  hoverCardMotion,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

export function HeroSearch() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? fadeMotion.initial : fadeMotion.initial}
      animate={shouldReduceMotion ? fadeMotion.animate : fadeMotion.animate}
      transition={{ ...fadeMotion.transition, delay: 0.05 }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="rounded-4xl border border-border/60 bg-background/80 p-3 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[1.7fr_1fr_1fr_auto]">
          {/* Keyword */}
          <div className="flex items-center gap-3 rounded-3xl px-4">
            <Search className="h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search businesses, jobs, housing..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Category */}
          <select className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary">
            <option>All Categories</option>
            <option>Businesses</option>
            <option>Jobs</option>
            <option>Housing</option>
            <option>Events</option>
            <option>Travel</option>
          </select>

          {/* Location */}
          <div className="flex items-center gap-2 rounded-2xl border border-border px-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Bangkok"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Search */}
          <Button size="lg" className="rounded-2xl px-8">
            Search
          </Button>
        </div>
      </div>

      {/* Quick Search Chips */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        <span className="text-sm text-muted-foreground">Popular:</span>

        {["Restaurants", "Jobs", "Housing", "Travel", "Visa", "Healthcare"].map((item) => (
          <motion.button
            key={item}
            variants={staggerItem}
            whileHover={shouldReduceMotion ? undefined : hoverButtonMotion.whileHover}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm transition hover:border-primary hover:bg-primary/5"
          >
            {item}
          </motion.button>
        ))}

        <motion.button
          variants={staggerItem}
          whileHover={shouldReduceMotion ? undefined : hoverButtonMotion.whileHover}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          <Sparkles className="h-4 w-4" />
          Ask Mingalar AI
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
