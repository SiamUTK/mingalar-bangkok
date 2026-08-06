"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home, Store, Briefcase, Bot, Menu } from "lucide-react";
import { useNavigationState } from "./navigation-state";

import { cn } from "@/lib/utils";

export interface BottomNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  action?: () => void;
}

export interface MobileBottomNavProps {
  items?: BottomNavItem[];
  className?: string;
}

const defaultItems: BottomNavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: "Directory",
    href: "/directory",
    icon: <Store className="h-5 w-5" />,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    label: "AI",
    href: "/ai",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    label: "More",
    icon: <Menu className="h-5 w-5" />,
  },
];

export function MobileBottomNav({ items = defaultItems, className }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { setIsMobileDrawerOpen } = useNavigationState();

  const resolvedItems = items.map((item) =>
    item.label === "More" && !item.action
      ? { ...item, action: () => setIsMobileDrawerOpen(true) }
      : item
  );

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden",
        className
      )}
    >
      <div className="grid h-16 grid-cols-5">
        {resolvedItems.map((item) => {
          const active =
            item.href &&
            (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/")));

          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer",
                  active ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.icon}
                <span className="text-[11px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                active ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.icon}
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
