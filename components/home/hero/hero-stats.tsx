"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, BriefcaseBusiness, House, Sparkles } from "lucide-react";

import { fadeMotion, hoverCardMotion, staggerContainer, staggerItem } from "@/lib/motion";

const stats = [
  {
    value: "12,000+",
    label: "Businesses",
    description: "Verified local businesses",
    icon: Building2,
  },
  {
    value: "4,500+",
    label: "Jobs",
    description: "New opportunities",
    icon: BriefcaseBusiness,
  },
  {
    value: "850+",
    label: "Housing",
    description: "Rooms & apartments",
    icon: House,
  },
  {
    value: "24/7",
    label: "AI Assistant",
    description: "Always ready to help",
    icon: Sparkles,
  },
];

export function HeroStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            whileHover={shouldReduceMotion ? undefined : hoverCardMotion.whileHover}
            initial={fadeMotion.initial}
            animate={fadeMotion.animate}
            transition={fadeMotion.transition}
            className="group rounded-3xl border border-border/60 bg-background/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>

            <div className="text-4xl font-black tracking-tight">{stat.value}</div>

            <div className="mt-2 text-lg font-semibold">{stat.label}</div>

            <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
