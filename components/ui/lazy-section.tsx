"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { SectionSkeleton } from "@/components/ui/loading-skeleton";

interface LazySectionProps {
  component: ComponentType;
  fallback?: React.ReactNode;
}

const LazySectionContent = dynamic(
  () =>
    Promise.resolve(function LazySectionContent({
      component: Component,
    }: {
      component: ComponentType;
    }) {
      return <Component />;
    }),
  {
    loading: () => <SectionSkeleton className="min-h-64" />,
    ssr: false,
  }
);

export function LazySection({ component: Component }: LazySectionProps) {
  return <LazySectionContent component={Component} />;
}

