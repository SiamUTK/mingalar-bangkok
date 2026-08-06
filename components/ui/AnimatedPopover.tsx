"use client";

import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { dropdownMotion } from "@/lib/motion";

interface AnimatedPopoverProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export function AnimatedPopover({ open, children, className }: AnimatedPopoverProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={async () => (await import("framer-motion")).domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div
            className={className}
            initial={dropdownMotion.initial}
            animate={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : dropdownMotion.animate}
            exit={shouldReduceMotion ? { opacity: 0, y: 0, scale: 1 } : dropdownMotion.exit}
            transition={shouldReduceMotion ? { duration: 0 } : dropdownMotion.transition}
          >
            {children}
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

