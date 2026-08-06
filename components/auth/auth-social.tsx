"use client";

import { Button } from "@/components/ui/button";

interface AuthSocialProps {
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
}: AuthSocialProps) {
  return (
    <div className="space-y-3">
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

