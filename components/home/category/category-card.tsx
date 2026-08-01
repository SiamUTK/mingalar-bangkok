"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

export interface CategoryCardProps {
  title: string;
  description: string;
  count: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export function CategoryCard({
  title,
  description,
  count,
  icon: Icon,
  href,
  color,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="group flex items-start gap-4 rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${color} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
              {title}
            </h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              {count}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
