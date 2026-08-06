"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Home, Bot, FileText, Plane, Banknote } from "lucide-react";

import { hoverCardMotion, staggerContainer, staggerItem } from "@/lib/motion";

const quickActions = [
  {
    title: "Find Jobs",
    description: "Factories, service & tech",
    icon: Briefcase,
    href: "/jobs",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Find Housing",
    description: "Rooms, condos & rentals",
    icon: Home,
    href: "/housing",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Ask AI",
    description: "24/7 Personal assistant",
    icon: Bot,
    href: "/ai",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Visa Help",
    description: "Renewals & legal advice",
    icon: FileText,
    href: "/visa",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Travel",
    description: "Flights & bus tickets",
    icon: Plane,
    href: "/travel",
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Money Services",
    description: "Exchange rates & transfer",
    icon: Banknote,
    href: "/money",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
];

export function HeroQuickActions() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 text-left">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Quick Access
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.div key={action.title} variants={staggerItem}>
              <Link href={action.href}>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : hoverCardMotion.whileHover}
                  className="group flex flex-col items-center rounded-2xl border border-border/60 bg-background/80 p-4 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                >
                  <div
                    className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl border ${action.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary">
                    {action.title}
                  </span>
                  <span className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                    {action.description}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

