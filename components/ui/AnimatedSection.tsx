"use client";

import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { fadeInViewport } from "@/lib/motion";

interface AnimatedSectionProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
}

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={async () => (await import("framer-motion")).domAnimation}>
      <m.section
        className={className}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : fadeInViewport.initial}
        whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : fadeInViewport.whileInView}
        viewport={fadeInViewport.viewport}
        transition={shouldReduceMotion ? { duration: 0 } : fadeInViewport.transition}
        {...props}
      >
        {children}
      </m.section>
    </LazyMotion>
  );
}
