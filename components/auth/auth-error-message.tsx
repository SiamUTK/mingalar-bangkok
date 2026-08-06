"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuthErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | null;
}

export function AuthErrorMessage({ message, className, ...props }: AuthErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/50",
        className
      )}
      {...props}
    >
      <p className="text-sm font-medium text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
}
