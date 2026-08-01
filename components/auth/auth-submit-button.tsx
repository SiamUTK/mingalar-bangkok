"use client";

import { Button } from "@/components/ui/button";

interface AuthSubmitButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function AuthSubmitButton({
  loading = false,
  loadingText = "Please wait...",
  children,
}: AuthSubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? loadingText : children}
    </Button>
  );
}
