"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { domAnimation, LazyMotion, m, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { hoverCardMotion } from "@/lib/motion";

// 1. แยก Type Props ของ Motion Article ให้ตรงตาม Type ของ Framer Motion โดยตรง
interface AnimatedCardProps extends HTMLMotionProps<"article"> {
  children: ReactNode;
  hoverable?: boolean;
}

// 2. ใช้ Helper Custom Hook สำหรับเช็ก Client-side Hydration โดยไม่ทำให้เกิด ESLint Cascading Render Error
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function AnimatedCard({
  children,
  hoverable = true,
  className,
  tabIndex,
  ...props
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isClient = useIsClient();

  // ช่วง Server-side / Hydration ให้ส่งคืนเป็น <article> ปกติเพื่อป้องกัน Hydration Mismatch
  if (!isClient) {
    return (
      <article className={className} tabIndex={tabIndex ?? 0}>
        {children}
      </article>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        className={className}
        tabIndex={tabIndex ?? 0}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
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
