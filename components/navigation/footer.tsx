"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, Phone, Mail, MapPin, ArrowRight, Globe } from "lucide-react";

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

// 🔴 SVG Custom Icons สำหรับไอคอนแบรนด์ที่ไม่มีใน Lucide-React
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// 🟢 Default Navigation Sections ที่ตรงกับ Routes ในโปรเจกต์ 100%
const defaultSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Find Jobs", href: "/jobs" },
      { label: "Housing & Rooms", href: "/housing" },
      { label: "Visa & 90-Day Help", href: "/visa" },
      { label: "Ask Mingalar AI", href: "/ai" },
      { label: "Member Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Business Directory", href: "/directory" },
      { label: "Community Events", href: "/events" },
      { label: "THB/MMK Rates", href: "/money" },
      { label: "Travel & Flights", href: "/travel" },
      { label: "News & Guides", href: "/news" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Help & FAQ", href: "/support" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

// 🟢 Default Social Links
const defaultSocialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
  { label: "LINE", href: "https://line.me", icon: <MessageCircle className="h-4 w-4" /> },
  { label: "Telegram", href: "https://telegram.org", icon: <Send className="h-4 w-4" /> },
  { label: "YouTube", href: "https://youtube.com", icon: <YoutubeIcon /> },
];

export function Footer({
  description = "Connecting the Myanmar community in Thailand with trusted local information, verified job opportunities, visa assistance, and AI support.",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Mingalar Bangkok by Siam On Cloud Co., Ltd. All rights reserved.`,
  className,
}: FooterProps) {
  const activeSections = sections.length > 0 ? sections : defaultSections;
  const activeSocials = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer
      className={cn("relative overflow-hidden border-t border-border bg-background", className)}
    >
      {/* Brand Gradient Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#AA2429] via-[#D9A441] to-[#1F2D49]" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Main Grid Container */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand & Info Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/"
                aria-label="Mingalar Bangkok"
                className="inline-flex shrink-0 transition-transform duration-300 hover:scale-[1.02]"
              >
                <Image
                  src="/logo/logo-footer.svg"
                  alt="Mingalar Bangkok"
                  width={140}
                  height={140}
                  priority
                  className="h-20 w-auto sm:h-24"
                />
              </Link>

              <div className="hidden sm:block h-12 w-px bg-border shrink-0" />

              <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>

            {/* Quick Company Contact Info */}
            <div className="space-y-2 rounded-2xl border border-border/60 bg-card/60 p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Pathumwan, Bangkok 10330, Thailand</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>+66 99 000 9588, +66 87 112 5025</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>info@siamon.cloud</span>
              </div>
            </div>

            {/* Social Links */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-1">
                {activeSocials.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      "border border-border bg-card text-muted-foreground",
                      "transition-all duration-300",
                      "hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                    )}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Link Columns */}
          {activeSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {section.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group inline-flex items-center text-xs text-muted-foreground",
                        "transition-all duration-300",
                        "hover:translate-x-1 hover:text-primary"
                      )}
                    >
                      <ArrowRight className="mr-0 h-3 w-0 opacity-0 text-primary transition-all duration-300 group-hover:mr-1.5 group-hover:w-3 group-hover:opacity-100" />
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
            {/* Left Side: Language Switcher & Copyright */}
            <div className="space-y-2">
              <LanguageSwitcher variant="inline" className="text-xs" />
              <p className="text-xs text-muted-foreground">{copyright}</p>
            </div>

            {/* Right Side: Essential Bottom Links */}
            <nav
              aria-label="Legal Links"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium"
            >
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Terms of Service
              </Link>

              <Link
                href="/support"
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Help Center
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
