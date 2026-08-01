"use client";

import { forwardRef } from "react";

import { Input } from "@/components/ui/input";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={props.id} className="text-sm font-medium">
          {label}
        </label>

        <Input ref={ref} className={className} {...props} />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
