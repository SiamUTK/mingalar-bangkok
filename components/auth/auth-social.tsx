"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AuthSocialProps extends React.HTMLAttributes<HTMLDivElement> {
  onGoogle?: () => Promise<void> | void;
  onApple?: () => Promise<void> | void;
  loading?: boolean;
  enableGoogle?: boolean;
  enableApple?: boolean;
}

export function AuthSocial({
  onGoogle,
  onApple,
  loading = false,
  enableGoogle = true,
  enableApple = false,
  className,
  ...props
}: AuthSocialProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {enableGoogle && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={loading}
          onClick={onGoogle}
        >
          Continue with Google
        </Button>
      )}

      {enableApple && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={loading}
          onClick={onApple}
        >
          Continue with Apple
        </Button>
      )}
    </div>
  );
}
