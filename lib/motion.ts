import type { Transition, Variant } from "framer-motion";

export const motionEasing = {
  easeOut: [0.16, 1, 0.3, 1] as const,
} as const;

export const motionDurations = {
  fast: 0.18,
  base: 0.24,
  slow: 0.3,
} as const;

// ปรับเปลี่ยน Signature ของฟังก์ชัน createTransition ให้รับ number ทั่วไป
export const createTransition = (duration: number = 0.24) => ({
  duration,
  ease: [0.25, 0.1, 0.25, 1.0],
});

export const fadeMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: createTransition(),
} as const;

export const slideUpMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: createTransition(),
} as const;

export const slideDownMotion = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: createTransition(),
} as const;

export const slideLeftMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8 },
  transition: createTransition(),
} as const;

export const slideRightMotion = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
  transition: createTransition(),
} as const;

export const scaleMotion = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: createTransition(motionDurations.fast),
} as const;

export const dropdownMotion = {
  initial: { opacity: 0, y: -8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: createTransition(motionDurations.fast),
} as const;

export const drawerMotion = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: createTransition(motionDurations.base),
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: createTransition(motionDurations.fast),
} as const;

export const floatingSearchMotion = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
  transition: createTransition(motionDurations.fast),
} as const;

export const hoverCardMotion = {
  initial: { y: 0, scale: 1 },
  whileHover: { y: -6, scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: createTransition(motionDurations.base),
} as const;

export const hoverButtonMotion = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.96 },
  transition: createTransition(motionDurations.fast),
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
      ...createTransition(motionDurations.base),
    },
  },
} as const;

export const staggerItem: Record<string, Variant> = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: createTransition(motionDurations.base) },
} as const;

export const fadeInViewport = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: createTransition(motionDurations.base),
} as const;
