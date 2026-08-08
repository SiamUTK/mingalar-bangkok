import type { Easing, MotionProps, TargetAndTransition, Transition, Variants } from "framer-motion";

export const motionDurations = {
  instant: 0,
  fastest: 0.1,
  faster: 0.15,
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.5,
  slowest: 0.8,
} as const;

export type MotionDurationKey = keyof typeof motionDurations;

export const motionEasings = {
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  sharp: [0.4, 0, 0.6, 1] as [number, number, number, number],
  springSmooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  springBouncy: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

export type MotionEasingKey = keyof typeof motionEasings;

export interface CreateTransitionOptions {
  duration?: number | MotionDurationKey;
  ease?: Easing | MotionEasingKey;
  delay?: number;
  staggerChildren?: number;
  delayChildren?: number;
}

export function createTransition(options: CreateTransitionOptions = {}): Transition {
  const {
    duration = "normal",
    ease = "easeOut",
    delay = 0,
    staggerChildren,
    delayChildren,
  } = options;

  const resolvedDuration = typeof duration === "string" ? motionDurations[duration] : duration;
  const resolvedEase =
    typeof ease === "string" && ease in motionEasings
      ? motionEasings[ease as MotionEasingKey]
      : (ease as Easing);

  const transition: Transition = {
    duration: resolvedDuration,
    ease: resolvedEase,
  };

  if (delay > 0) {
    transition.delay = delay;
  }

  if (staggerChildren !== undefined) {
    transition.staggerChildren = staggerChildren;
  }

  if (delayChildren !== undefined) {
    transition.delayChildren = delayChildren;
  }

  return transition;
}

export const fadeMotion: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: createTransition({ duration: "normal", ease: "easeOut" }),
  },
  exit: {
    opacity: 0,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const slideUpMotion: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const slideDownMotion: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const slideLeftMotion: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const slideRightMotion: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const scaleMotion: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: createTransition({ duration: "normal", ease: "easeOut" }),
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const modalMotion: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const drawerMotion: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: createTransition({ duration: "normal", ease: "springSmooth" }),
  },
  exit: {
    x: "100%",
    transition: createTransition({ duration: "fast", ease: "easeIn" }),
  },
};

export const popoverMotion: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: createTransition({ duration: "faster", ease: "easeOut" }),
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -4,
    transition: createTransition({ duration: "fastest", ease: "easeIn" }),
  },
};

export const dropdownMotion: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: createTransition({ duration: "faster", ease: "springSmooth" }),
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: createTransition({ duration: "fastest", ease: "easeIn" }),
  },
};

export const hoverScale: TargetAndTransition = {
  scale: 1.02,
  transition: createTransition({ duration: "fastest", ease: "easeOut" }),
};

export const hoverLift: TargetAndTransition = {
  y: -4,
  transition: createTransition({ duration: "faster", ease: "easeOut" }),
};

export const tapScale: TargetAndTransition = {
  scale: 0.98,
  transition: createTransition({ duration: "fastest", ease: "easeOut" }),
};

export const hoverMotionProps: MotionProps = {
  whileHover: hoverScale,
  whileTap: tapScale,
};

export const liftMotionProps: MotionProps = {
  whileHover: hoverLift,
  whileTap: tapScale,
};

export const floatingSearchMotion = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
  transition: createTransition({ duration: "fast", ease: "springSmooth" }),
};

export const hoverCardMotion = {
  whileHover: hoverScale,
  whileTap: tapScale,
};

export const fadeInViewport = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: createTransition({ duration: "normal", ease: "springSmooth" }),
};
