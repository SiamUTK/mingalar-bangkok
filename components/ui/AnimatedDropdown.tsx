// components/ui/AnimatedDropdown.tsx
"use client";

import * as React from "react";
import { motion, useReducedMotion, TargetAndTransition, Transition } from "framer-motion";
import { dropdownMotion } from "@/lib/motion";

export interface AnimatedDropdownProps {
  open?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedDropdown({ children, className }: AnimatedDropdownProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : (dropdownMotion.initial as TargetAndTransition)
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : (dropdownMotion.animate as TargetAndTransition)
      }
      exit={
        shouldReduceMotion
          ? { opacity: 0, y: 0, scale: 1 }
          : (dropdownMotion.exit as TargetAndTransition)
      }
      transition={shouldReduceMotion ? { duration: 0 } : (dropdownMotion.transition as Transition)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
