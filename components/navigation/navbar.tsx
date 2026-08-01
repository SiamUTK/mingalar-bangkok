"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useNavigationState } from "./navigation-state";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  brand?: string;
  items?: NavItem[];
  onMobileMenuToggle?: (open: boolean) => void;
  className?: string;
}

export function Navbar({
  brand = "Mingalar Bangkok",
  items = [],
  onMobileMenuToggle,
  className,
}: NavbarProps) {
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useNavigationState();
  const [isScrolled, setIsScrolled] = useState(false);

  function toggleMobileMenu() {
    const open = !isMobileDrawerOpen;
    setIsMobileDrawerOpen(open);
    onMobileMenuToggle?.(open);
  }

  function closeMobileMenu() {
    setIsMobileDrawerOpen(false);
    onMobileMenuToggle?.(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all duration-300",
        isScrolled ? "shadow-sm bg-background/95" : "shadow-none",
        className
      )}
      onMouseEnter={() => setIsScrolled(true)}
      onMouseLeave={() => setIsScrolled(false)}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/logo-navbar.svg"
            alt={brand}
            width={180}
            height={40}
            priority
            sizes="(max-width: 640px) 144px, 180px"
            className="h-10 w-auto shrink-0 sm:h-12"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher variant="dropdown" />

          <Link href="/login">
            <Button variant="ghost" size="sm" className="rounded-xl font-medium">
              Sign In
            </Button>
          </Link>

          <Link href="/register">
            <Button size="sm" className="rounded-xl font-semibold shadow-md shadow-primary/20">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={isMobileDrawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileDrawerOpen}
        >
          {isMobileDrawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Inline Dropdown */}
      {isMobileDrawerOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-2 p-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <div className="border-t border-border pt-4">
              <LanguageSwitcher variant="mobile" />
            </div>

            <div className="space-y-2 pt-4">
              <Link href="/login" onClick={closeMobileMenu} className="block w-full">
                <Button variant="outline" className="w-full rounded-xl">
                  Sign In
                </Button>
              </Link>

              <Link href="/register" onClick={closeMobileMenu} className="block w-full">
                <Button className="w-full rounded-xl font-semibold">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
