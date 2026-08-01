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
  description = "Connecting the Myanmar community in Thailand with trusted local information and resources.",
  sections = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} Mingalar Bangkok. All rights reserved.`,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn("relative overflow-hidden border-t border-border bg-background", className)}
    >
      {/* Brand Gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#AA2429] via-[#D9A441] to-[#1F2D49]" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Grid Container - ปรับ Grid ให้ส่วน Brand ขยายกว้างขึ้นเล็กน้อยเพื่อรองรับ Logo + Text แนวยาว */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand Section */}
          <div className="space-y-6">
            {/* โลโก้และข้อความวางขนานกันในแนวนอน (Flex Row) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/"
                aria-label="Mingalar Bangkok"
                className="inline-flex shrink-0 transition-transform duration-300 hover:scale-[1.03]"
              >
                <Image
                  src="/logo/logo-footer.svg"
                  alt="Mingalar Bangkok"
                  width={140}
                  height={140}
                  priority
                  className="h-24 w-auto sm:h-28"
                />
              </Link>

              {/* เส้นกั้นแบ่งระหว่าง โลโก้ กับ ข้อความ (แสดงผลบนหน้าจอขนาดใหญ่) */}
              <div className="hidden sm:block h-12 w-px bg-border shrink-0" />

              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </div>

            {/* Social Links อยู่ด้านล่างของชุด Logo+Text */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl",
                      "border border-border bg-card",
                      "transition-all duration-300",
                      "hover:-translate-y-1",
                      "hover:border-primary",
                      "hover:bg-primary",
                      "hover:text-primary-foreground",
                      "hover:shadow-lg"
                    )}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#1F2D49]">
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group inline-flex items-center text-sm text-muted-foreground",
                        "transition-all duration-300",
                        "hover:translate-x-1 hover:text-primary"
                      )}
                    >
                      <span className="mr-0 w-0 overflow-hidden text-primary transition-all duration-300 group-hover:mr-2 group-hover:w-2">
                        →
                      </span>

                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="space-y-3">
              <LanguageSwitcher variant="inline" className="text-sm" />

              <p className="text-sm text-muted-foreground">{copyright}</p>
            </div>

            {/* Right */}
            <nav
              aria-label="Footer Links"
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Terms
              </Link>

              <Link
                href="/cookies"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Cookies
              </Link>

              <Link
                href="/contact"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
