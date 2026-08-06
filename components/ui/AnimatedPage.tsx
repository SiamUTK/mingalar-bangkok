"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";

import { pageTransition } from "@/lib/motion";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

// Helper Hook สำหรับเช็ก Client Hydration ใน React 18/19 อย่างปลอดภัย
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const isClient = useIsClient();

  // ช่วง Server-side / Hydration ให้ส่งคืนเป็น <div> ปกติก่อน เพื่อป้องกัน Hydration Mismatch
  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : pageTransition.initial}
        animate={shouldReduceMotion ? { opacity: 1, y: 0 } : pageTransition.animate}
        exit={shouldReduceMotion ? { opacity: 1, y: 0 } : pageTransition.exit}
        transition={shouldReduceMotion ? { duration: 0 } : pageTransition.transition}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

