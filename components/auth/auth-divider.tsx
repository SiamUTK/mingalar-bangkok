"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuthDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function AuthDivider({ label = "or", className, ...props }: AuthDividerProps) {
  return (
    <div className={cn("relative my-6", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-background px-4 text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
