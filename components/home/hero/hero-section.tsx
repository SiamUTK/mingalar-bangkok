"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeMotion, slideUpMotion, staggerContainer, staggerItem } from "@/lib/motion";

import { HeroSearch } from "@/components/home/hero/hero-search";
import { HeroStats } from "@/components/home/hero/hero-stats";
import { HeroQuickActions } from "@/components/home/hero/hero-quick-actions";
import { HeroMemberBenefits } from "@/components/home/hero/hero-member-benefits";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Background Radial Gradient (Warm Brand Glow) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(170,36,41,0.08),transparent_55%)]" />

      <div className="container relative mx-auto px-6 pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={slideUpMotion}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4 text-[#aa2429]" />
            AI-First Super App for the Myanmar Community
          </motion.div>

          {/* Heading with Cohesive Brand Color Gradient */}
          <motion.h1
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={slideUpMotion}
            className="text-5xl font-black tracking-tight md:text-7xl"
          >
            Everything the{" "}
            <span className="bg-gradient-to-r from-[#aa2429] via-[#c92a31] to-[#f4b85b] bg-clip-text text-transparent">
              Myanmar Community
            </span>{" "}
            Needs in Thailand
          </motion.h1>

          {/* Description with Bilingual Helper */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={slideUpMotion}
            className="mx-auto mt-6 max-w-3xl space-y-2 text-lg leading-8 text-muted-foreground md:text-xl"
          >
            <p>
              Find jobs, discover trusted businesses, search housing, plan your trip, get visa
              assistance, compare money services and ask{" "}
              <span className="font-semibold text-foreground">Mingalar AI</span> — all in one place.
            </p>

            {/* Prominent Burmese Subtext */}
            <p className="text-sm md:text-base font-normal text-muted-foreground/80 pt-1">
              အလုပ်အကိုင်၊ အိမ်ခန်း၊ ဗီဇာနှင့် AI အကူအညီများကို တစ်နေရာတည်းတွင် ရှာဖွေပါ။
            </p>
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div variants={shouldReduceMotion ? undefined : staggerItem}>
              <Link href="/register">
                <Button
                  size="lg"
                  className="min-w-55 rounded-2xl bg-[#aa2429] hover:bg-[#8e1e22] text-white shadow-lg shadow-[#aa2429]/20"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={shouldReduceMotion ? undefined : staggerItem}>
              <Link href="/ai">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-55 rounded-2xl border-primary/30 hover:border-primary"
                >
                  <Bot className="mr-2 h-4 w-4 text-[#aa2429]" />
                  Ask Mingalar AI
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* AI Assistant Hook Badge */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={slideUpMotion}
            className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>⚡ No signup required: Try 3 free questions instantly with Mingalar AI</span>
          </motion.div>

          {/* Universal Search */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={fadeMotion}
            className="mt-10"
          >
            <HeroSearch />
          </motion.div>

          {/* Quick Actions (Cards) */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={fadeMotion}
            className="mt-12"
          >
            <HeroQuickActions />
          </motion.div>

          {/* Platform Statistics */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={fadeMotion}
            className="mt-14"
          >
            <HeroStats />
          </motion.div>

          {/* Member Benefits */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={fadeMotion}
            className="mt-14"
          >
            <HeroMemberBenefits />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
