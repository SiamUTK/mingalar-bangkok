"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeMotion, slideUpMotion, staggerContainer, staggerItem } from "@/lib/motion";

import { HeroSearch } from "./hero-search";
import { HeroStats } from "./hero-stats";
import { HeroQuickActions } from "./hero-quick-actions";
import { HeroMemberBenefits } from "./hero-member-benefits";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />

      <div className="container relative mx-auto px-6 pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : slideUpMotion.initial}
            animate={shouldReduceMotion ? undefined : slideUpMotion.animate}
            transition={shouldReduceMotion ? undefined : slideUpMotion.transition}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            AI-First Super App for the Myanmar Community
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={shouldReduceMotion ? false : slideUpMotion.initial}
            animate={shouldReduceMotion ? undefined : slideUpMotion.animate}
            transition={{
              ...slideUpMotion.transition,
              delay: 0.05,
            }}
            className="text-5xl font-black tracking-tight md:text-7xl"
          >
            Everything the{" "}
            <span className="bg-linear-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Myanmar Community
            </span>{" "}
            Needs in Thailand
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={shouldReduceMotion ? false : slideUpMotion.initial}
            animate={shouldReduceMotion ? undefined : slideUpMotion.animate}
            transition={{
              ...slideUpMotion.transition,
              delay: 0.1,
            }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl"
          >
            Find jobs, discover trusted businesses, search housing, plan your trip, get visa
            assistance, compare money services and ask{" "}
            <span className="font-semibold text-foreground">Mingalar AI</span> — all in one place.
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div variants={shouldReduceMotion ? undefined : staggerItem}>
              <Link href="/register">
                <Button size="lg" className="min-w-55 rounded-2xl shadow-lg shadow-primary/20">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={shouldReduceMotion ? undefined : staggerItem}>
              <Link href="/ai">
                <Button variant="outline" size="lg" className="min-w-55 rounded-2xl">
                  <Bot className="mr-2 h-4 w-4 text-primary" />
                  Ask Mingalar AI
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Universal Search */}
          <motion.div
            initial={shouldReduceMotion ? false : fadeMotion.initial}
            animate={shouldReduceMotion ? undefined : fadeMotion.animate}
            transition={{
              ...fadeMotion.transition,
              delay: 0.15,
            }}
            className="mt-10"
          >
            <HeroSearch />
          </motion.div>

          {/* Quick Actions (Cards) */}
          <motion.div
            initial={shouldReduceMotion ? false : fadeMotion.initial}
            animate={shouldReduceMotion ? undefined : fadeMotion.animate}
            transition={{
              ...fadeMotion.transition,
              delay: 0.2,
            }}
            className="mt-12"
          >
            <HeroQuickActions />
          </motion.div>

          {/* Platform Statistics */}
          <motion.div
            initial={shouldReduceMotion ? false : fadeMotion.initial}
            animate={shouldReduceMotion ? undefined : fadeMotion.animate}
            transition={{
              ...fadeMotion.transition,
              delay: 0.25,
            }}
            className="mt-14"
          >
            <HeroStats />
          </motion.div>

          {/* Member Benefits */}
          <motion.div
            initial={shouldReduceMotion ? false : fadeMotion.initial}
            animate={shouldReduceMotion ? undefined : fadeMotion.animate}
            transition={{
              ...fadeMotion.transition,
              delay: 0.3,
            }}
            className="mt-14"
          >
            <HeroMemberBenefits />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
