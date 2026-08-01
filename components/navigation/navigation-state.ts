"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export function useNavigationState() {
  const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    if (!isMobileDrawerOpen && !isLanguageOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsMobileDrawerOpen(false);
      setIsLanguageOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, isMobileDrawerOpen, isLanguageOpen]);

  return useMemo(
    () => ({
      pathname,
      isMobileDrawerOpen,
      setIsMobileDrawerOpen,
      isLanguageOpen,
      setIsLanguageOpen,
    }),
    [pathname, isMobileDrawerOpen, isLanguageOpen]
  );
}
