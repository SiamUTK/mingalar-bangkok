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
        "sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl transition-all duration-300",
        isScrolled ? "shadow-sm" : "shadow-none",
        className
      )}
      onMouseEnter={() => setIsScrolled(true)}
      onMouseLeave={() => setIsScrolled(false)}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo-navbar.svg"
            alt="Mingalar Bangkok"
            width={180}
            height={40}
            priority
            sizes="(max-width: 640px) 144px, 180px"
            className="h-9 w-auto shrink-0 sm:h-10"
          />

          <div className="hidden sm:block">
            <p className="text-base font-bold text-foreground transition-transform duration-300">
              {brand}
            </p>
            <p className="text-xs text-muted-foreground">Myanmar Community Platform</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav
          className={cn(
            "hidden items-center gap-8 lg:flex transition-opacity duration-300",
            isScrolled ? "opacity-70" : "opacity-100"
          )}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div
          className={cn(
            "hidden items-center gap-3 lg:flex transition-opacity duration-300",
            isScrolled ? "opacity-70" : "opacity-100"
          )}
        >
          <LanguageSwitcher variant="dropdown" />

          <Button variant="ghost" size="sm">
            <Link href="/login">Sign In</Link>
          </Button>

          <Button size="sm">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Button */}
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

      {/* Mobile Menu */}
      {isMobileDrawerOpen && (
        <div className="border-t border-border bg-background lg:hidden">
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
              <Link href="/login" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>

              <Link href="/register" onClick={closeMobileMenu}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
