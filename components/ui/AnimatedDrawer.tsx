// components/ui/AnimatedDrawer.tsx
"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  TargetAndTransition,
  Transition,
} from "framer-motion";
import { drawerMotion } from "@/lib/motion";

export interface AnimatedDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedDrawer({ open, onClose, children, className }: AnimatedDrawerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
          />

          {/* Drawer Content */}
          <motion.aside
            initial={
              shouldReduceMotion
                ? { opacity: 1, x: 0 }
                : (drawerMotion.initial as TargetAndTransition)
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1, x: 0 }
                : (drawerMotion.animate as TargetAndTransition)
            }
            exit={
              shouldReduceMotion ? { opacity: 0, x: 0 } : (drawerMotion.exit as TargetAndTransition)
            }
            transition={
              shouldReduceMotion ? { duration: 0 } : (drawerMotion.transition as Transition)
            }
            className={className}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
