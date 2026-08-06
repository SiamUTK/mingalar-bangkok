"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>

        <Input ref={ref} id={id} className={cn(className)} {...props} />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
