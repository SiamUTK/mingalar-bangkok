"use client";

import { MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui";

export interface StickyMobileActionBarProps {
  phone: string;
  address: string;
  onCall: () => void;
  onGetDirections: () => void;
}

export function StickyMobileActionBar({
  phone,
  address,
  onCall,
  onGetDirections,
}: StickyMobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="mx-auto flex max-w-screen-sm gap-2 p-3">
        <Button
          type="button"
          onClick={onCall}
          className="flex-1 gap-2"
          aria-label={`Call ${phone}`}
        >
          <Phone className="h-4 w-4" />
          Call
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onGetDirections}
          className="flex-1 gap-2"
          aria-label={`Get directions to ${address}`}
        >
          <MapPin className="h-4 w-4" />
          Directions
        </Button>
      </div>
    </div>
  );
}

