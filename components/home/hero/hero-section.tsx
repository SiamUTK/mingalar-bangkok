"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeMotion, slideUpMotion, staggerContainer, staggerItem } from "@/lib/motion";

import { HeroSearch } from "./hero-search";
import { HeroStats } from "./hero-stats";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const heroMotion = shouldReduceMotion ? { opacity: 1, y: 0 } : slideUpMotion;

  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />

      <div className="container relative mx-auto px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={heroMotion.initial}
            animate={heroMotion.animate}
            transition={heroMotion.transition}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Platform for the Myanmar Community
          </motion.div>

          <motion.h1
            initial={heroMotion.initial}
            animate={heroMotion.animate}
            transition={{ ...heroMotion.transition, delay: 0.04 }}
            className="text-5xl font-black tracking-tight text-foreground md:text-7xl"
          >
            Everything the
            <span className="block bg-linear-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
              Myanmar Community
            </span>
            Needs in Thailand
          </motion.h1>

          <motion.p
            initial={heroMotion.initial}
            animate={heroMotion.animate}
            transition={{ ...heroMotion.transition, delay: 0.08 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl"
          >
            Discover trusted businesses, find jobs, explore housing, connect with local events, and
            get instant help from Mingalar AI.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div variants={staggerItem}>
              <Link href="/register">
                <Button size="lg">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Link href="/directory">
                <Button variant="outline" size="lg">
                  Explore Directory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={fadeMotion.initial}
            animate={fadeMotion.animate}
            transition={{ ...fadeMotion.transition, delay: 0.12 }}
            className="mt-14"
          >
            <HeroSearch />
          </motion.div>

          <motion.div
            initial={fadeMotion.initial}
            animate={fadeMotion.animate}
            transition={{ ...fadeMotion.transition, delay: 0.16 }}
            className="mt-14"
          >
            <HeroStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
