"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { domAnimation, LazyMotion, m, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { fadeInViewport } from "@/lib/motion";

// 1. เปลี่ยนการขยาย Type เป็น HTMLMotionProps<"section"> เพื่อป้องกัน Type Mismatch กับ <m.section>
interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
}

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const isClient = useIsClient();

  if (!isClient) {
    return <section className={className}>{children}</section>;
  }

  return (
    <LazyMotion features={domAnimation}>
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
