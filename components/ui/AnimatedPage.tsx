"use client";

import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { pageTransition } from "@/lib/motion";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={async () => (await import("framer-motion")).domAnimation}>
      <m.div
        className={className}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : pageTransition.initial}
        animate={shouldReduceMotion ? { opacity: 1, y: 0 } : pageTransition.animate}
        exit={shouldReduceMotion ? { opacity: 1, y: 0 } : pageTransition.exit}
        transition={shouldReduceMotion ? { duration: 0 } : pageTransition.transition}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
