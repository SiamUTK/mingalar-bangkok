"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DesktopSearchModal } from "./desktop-search-modal";
import { MobileFullscreenSearch } from "./mobile-fullscreen-search";

export interface GlobalSearchOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function GlobalSearchOverlay({ isOpen = false, onClose }: GlobalSearchOverlayProps) {
  const [searchOpen, setSearchOpen] = useState(isOpen);
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [searchOpen]);

  const handleClose = () => {
    setSearchOpen(false);
    setQuery("");
    onClose?.();
  };

  if (!searchOpen) {
    return null;
  }

  return isMobile ? (
    <MobileFullscreenSearch query={query} onQueryChange={setQuery} onClose={handleClose} />
  ) : (
    <DesktopSearchModal query={query} onQueryChange={setQuery} onClose={handleClose} />
  );
}

export type SearchTriggerProps = React.ComponentPropsWithoutRef<typeof Button>;

export function SearchTrigger({ className, ...props }: SearchTriggerProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="default"
        onClick={() => setSearchOpen(true)}
        className={`w-full max-w-xs gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:bg-card md:max-w-sm ${
          className ?? ""
        }`}
        {...props}
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
      </Button>

      <GlobalSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
