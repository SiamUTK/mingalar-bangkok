"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useMemo, type ReactNode } from "react";

import { AnimatedPage } from "@/components/ui/AnimatedPage";

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();

  const key = useMemo(() => pathname ?? "home", [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <AnimatedPage key={key} className="h-full">
        {children}
      </AnimatedPage>
    </AnimatePresence>
  );
}

