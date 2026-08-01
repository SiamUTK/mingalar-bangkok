"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  brand?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
  copyright?: string;
  className?: string;
}

export function Footer({
  brand = "Mingalar Bangkok",
  description = "AI-powered platform for the Myanmar community in Thailand.",
  sections = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} Mingalar Bangkok. All rights reserved.`,
  className,
}: FooterProps) {
  return (
    <footer className={cn("border-t border-border bg-muted/20", className)}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/logo-footer.svg"
                alt="Mingalar Bangkok"
                width={220}
                height={48}
                sizes="(max-width: 640px) 160px, 220px"
                className="h-10 w-auto shrink-0 sm:h-12"
              />

              <div>
                <h2 className="text-lg font-bold">{brand}</h2>

                <p className="text-xs text-muted-foreground">Myanmar Community Platform</p>
              </div>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-muted-foreground">{description}</p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition hover:border-primary hover:text-primary"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold">{section.title}</h3>

              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-border pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <LanguageSwitcher variant="inline" className="text-sm" />

              <p className="text-sm text-muted-foreground">{copyright}</p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground transition hover:text-primary">
                Privacy Policy
              </Link>

              <Link href="/terms" className="text-muted-foreground transition hover:text-primary">
                Terms of Service
              </Link>

              <Link href="/cookies" className="text-muted-foreground transition hover:text-primary">
                Cookie Policy
              </Link>

              <Link href="/contact" className="text-muted-foreground transition hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
