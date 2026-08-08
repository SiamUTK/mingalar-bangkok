"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, BriefcaseBusiness, Building2, Bot } from "lucide-react";

import { hoverScale, staggerContainer, staggerItem } from "@/lib/motion";

const stats = [
  {
    value: "12,000+",
    label: "Community Members",
    description: "Active Myanmar diaspora in Thailand",
    icon: Users,
  },
  {
    value: "4,500+",
    label: "Jobs Available",
    description: "Verified workplaces and positions",
    icon: BriefcaseBusiness,
  },
  {
    value: "850+",
    label: "Local Businesses",
    description: "Shops, services & agencies",
    icon: Building2,
  },
  {
    value: "24/7",
    label: "AI Assistant",
    description: "Multilingual guidance anytime",
    icon: Bot,
  },
];

export function HeroStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            variants={shouldReduceMotion ? undefined : staggerItem}
            whileHover={shouldReduceMotion ? undefined : hoverScale}
            className="group rounded-3xl border border-border/60 bg-background/70 p-6 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>

            <div className="text-3xl font-black tracking-tight md:text-4xl">{stat.value}</div>
            <div className="mt-1 text-base font-bold text-foreground">{stat.label}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
