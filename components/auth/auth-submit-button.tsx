"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export interface AuthSubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function AuthSubmitButton({
  loading = false,
  loadingText = "Please wait...",
  children,
  className,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button type="submit" className={className} disabled={loading || props.disabled} {...props}>
      {loading ? loadingText : children}
    </Button>
  );
}
