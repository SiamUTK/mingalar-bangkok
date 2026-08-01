"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface OfflineBannerProps {
  className?: string;
}

export function OfflineBanner({ className }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 bg-warning/10 border-b border-warning/30 px-4 py-3 flex gap-3 items-center justify-center z-40",
        className
      )}
    >
      <WifiOff className="h-5 w-5 text-warning flex-shrink-0" />
      <div className="text-sm font-medium text-warning">
        You&apos;re offline. Some features may be limited.
      </div>
    </div>
  );
}
