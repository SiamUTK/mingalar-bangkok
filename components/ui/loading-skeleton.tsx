import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-2xl bg-muted/80 animation-duration-[1.2s]", className)}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm"
          >
            <Skeleton className="h-40" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm",
        className
      )}
    >
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "space-y-3 rounded-3xl border border-border/60 bg-background/70 p-5 shadow-sm",
        className
      )}
    >
      <Skeleton className="h-36" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}
