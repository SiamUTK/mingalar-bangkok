import { PageSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background" aria-busy="true" aria-label="Loading content">
      <PageSkeleton />
    </main>
  );
}
