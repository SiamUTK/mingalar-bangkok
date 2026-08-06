"use client";

import * as React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export interface SearchLoadingSkeletonProps {
  className?: string;
}

export function SearchLoadingSkeleton({ className }: SearchLoadingSkeletonProps) {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {/* Tab skeleton */}
      <div className="flex gap-4 px-6 py-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* Results skeleton */}
      <div className="space-y-3 px-6 py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <SkeletonText lines={2} />
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
