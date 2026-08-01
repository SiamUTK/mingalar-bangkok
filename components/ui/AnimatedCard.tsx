"use client";

import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { hoverCardMotion } from "@/lib/motion";

interface AnimatedCardProps extends ComponentPropsWithoutRef<"article"> {
  children: ReactNode;
  hoverable?: boolean;
}

export function AnimatedCard({
  children,
  hoverable = true,
  className,
  ...props
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={async () => (await import("framer-motion")).domAnimation}>
      <m.article
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        whileHover={hoverable && !shouldReduceMotion ? hoverCardMotion.whileHover : undefined}
        whileTap={hoverable && !shouldReduceMotion ? hoverCardMotion.whileTap : undefined}
        {...props}
      >
        {children}
      </m.article>
    </LazyMotion>
  );
}
