"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

interface AnimatedHomeSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedHomeSection({ children, className }: AnimatedHomeSectionProps) {
  return <AnimatedSection className={cn("w-full", className)}>{children}</AnimatedSection>;
}

