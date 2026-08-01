"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  Bookmark,
  FileCheck,
  Bot,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications", icon: FileCheck },
  { href: "/saved", label: "Saved Items", icon: Bookmark },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Navigation Bar for Member Area */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-black text-lg text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                M
              </span>
              Mingalar Bangkok
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Right Side */}
          <div className="flex items-center gap-3">
            <Link href="/ai">
              <Button size="sm" className="rounded-xl text-xs font-bold gap-1.5">
                <Bot className="h-3.5 w-3.5" />
                Ask AI
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl text-xs text-muted-foreground"
              >
                <LogOut className="h-3.5 w-3.5 md:mr-1" />
                <span className="hidden md:inline">Exit App</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="pb-16">{children}</main>
    </div>
  );
}
