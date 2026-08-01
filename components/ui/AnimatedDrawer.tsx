"use client";

import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { drawerMotion } from "@/lib/motion";

interface AnimatedDrawerProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function AnimatedDrawer({
  open,
  onClose,
  children,
  className,
  overlayClassName,
}: AnimatedDrawerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={async () => (await import("framer-motion")).domAnimation}>
      <AnimatePresence>
        {open ? (
          <>
            <m.div
              className={
                overlayClassName ?? "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={onClose}
            />
            <m.aside
              className={
                className ??
                "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-card shadow-2xl md:hidden"
              }
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : drawerMotion.initial}
              animate={shouldReduceMotion ? { opacity: 1, x: 0 } : drawerMotion.animate}
              exit={shouldReduceMotion ? { opacity: 0, x: 0 } : drawerMotion.exit}
              transition={shouldReduceMotion ? { duration: 0 } : drawerMotion.transition}
            >
              {children}
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
