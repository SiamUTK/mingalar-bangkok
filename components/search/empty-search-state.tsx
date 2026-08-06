"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { EmptyState as FoundationEmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export interface EmptySearchStateProps {
  onGetStarted?: () => void;
}

export function EmptySearchState({ onGetStarted }: EmptySearchStateProps) {
  return (
    <div className="py-12">
      <FoundationEmptyState
        icon={<Search className="h-12 w-12 text-muted-foreground" />}
        title="Start searching"
        description="Explore businesses, jobs, housing, travel, and more from the Myanmar community in Thailand"
        action={
          onGetStarted ? <Button onClick={onGetStarted}>Browse categories</Button> : undefined
        }
      />
    </div>
  );
}
