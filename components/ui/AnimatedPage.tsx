// components/ui/AnimatedPage.tsx
"use client";

import * as React from "react";
import { motion, useReducedMotion, TargetAndTransition, Transition } from "framer-motion";
import { pageTransition } from "@/lib/motion";

export interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : (pageTransition.initial as TargetAndTransition)
      }
      animate={
        shouldReduceMotion ? { opacity: 1, y: 0 } : (pageTransition.animate as TargetAndTransition)
      }
      exit={
        shouldReduceMotion ? { opacity: 0, y: 0 } : (pageTransition.exit as TargetAndTransition)
      }
      transition={shouldReduceMotion ? { duration: 0 } : (pageTransition.transition as Transition)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
