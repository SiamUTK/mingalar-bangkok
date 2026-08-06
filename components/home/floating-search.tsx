"use client";

import { useEffect, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { floatingSearchMotion } from "@/lib/motion";

export function FloatingSearch() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setVisible(window.scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-16 z-40 mx-auto flex justify-center px-4 sm:px-6 lg:px-8"
      initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : floatingSearchMotion.initial}
      animate={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : floatingSearchMotion.animate}
      exit={shouldReduceMotion ? { opacity: 0, y: 0, scale: 1 } : floatingSearchMotion.exit}
      transition={shouldReduceMotion ? { duration: 0 } : floatingSearchMotion.transition}
    >
      <div className="flex w-full max-w-3xl items-center gap-3 rounded-full border border-border/70 bg-background/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search businesses, jobs, housing..."
          className="flex-1 bg-transparent text-sm outline-none"
        />
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          <Sparkles className="h-4 w-4" />
          AI
        </button>
      </div>
    </motion.div>
  );
}

