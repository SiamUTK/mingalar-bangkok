"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";

export interface DrawerItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  brand?: string;
  description?: string;
  items?: DrawerItem[];
  className?: string;
}

export function MobileDrawer({
  open,
  onClose,
  brand = "Mingalar Bangkok",
  description = "AI-powered platform for the Myanmar community in Thailand.",
  items = [],
  className,
}: MobileDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col border-r border-border bg-background shadow-2xl transition-transform lg:hidden",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 className="text-lg font-bold">{brand}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="mt-8 border-t border-border pt-6">
            <LanguageSwitcher variant="mobile" />
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-border p-4">
          <div className="space-y-2">
            <Link href="/login" onClick={onClose} className="block w-full">
              <Button variant="outline" className="w-full rounded-xl">
                Sign In
              </Button>
            </Link>

            <Link href="/register" onClick={onClose} className="block w-full">
              <Button className="w-full rounded-xl font-semibold">Create Free Account</Button>
            </Link>
          </div>

          <div className="mt-6 flex justify-center gap-5 text-xs text-muted-foreground">
            <Link href="/privacy" onClick={onClose}>
              Privacy
            </Link>
            <Link href="/terms" onClick={onClose}>
              Terms
            </Link>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </>
  );
}
