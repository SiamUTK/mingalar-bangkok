"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Bookmark, Send, Sparkles, Bell, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeMotion, hoverCardMotion } from "@/lib/motion";

const benefits = [
  {
    icon: Bookmark,
    title: "Save Favorites",
    description: "Bookmark jobs, housing, and places to view anytime.",
  },
  {
    icon: Send,
    title: "Direct Applications",
    description: "Apply for jobs & contact property owners directly.",
  },
  {
    icon: Sparkles,
    title: "Personalized AI",
    description: "Get smart recommendations tailored to your location.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified for visa updates and new job listings.",
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Post, comment, and connect with fellow members.",
  },
];

export function HeroMemberBenefits() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : fadeMotion.initial}
      animate={shouldReduceMotion ? undefined : fadeMotion.animate}
      transition={fadeMotion.transition}
      className="mx-auto max-w-5xl rounded-3xl border border-primary/20 bg-linear-to-b from-primary/5 via-background to-background p-6 md:p-8 text-left shadow-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Info */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            100% Free Account
          </span>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Why Create a Free Account?
          </h3>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Unlock the full potential of Mingalar Bangkok. Get full access to AI assistance, save
            your favorite listings, and stay updated with personalized alerts.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/register">
              <Button className="rounded-2xl shadow-md">Create Your Free Account</Button>
            </Link>
          </div>
        </div>

        {/* Benefits List */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:w-90">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={shouldReduceMotion ? undefined : hoverCardMotion.whileHover}
                className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/80 p-3.5 shadow-sm backdrop-blur-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

