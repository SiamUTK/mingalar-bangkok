"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Home,
  Building2,
  FileText,
  Plane,
  Banknote,
  GraduationCap,
  HeartPulse,
} from "lucide-react";

export interface TrendingCategory {
  id: string;
  name: string;
  count: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const MOCK_TRENDING_CATEGORIES: TrendingCategory[] = [
  {
    id: "jobs",
    name: "Jobs & Careers",
    count: "4.5k+ listings",
    icon: Briefcase,
    href: "/jobs",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "housing",
    name: "Housing & Rentals",
    count: "1.2k+ places",
    icon: Home,
    href: "/housing",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "business",
    name: "Local Businesses",
    count: "850+ shops",
    icon: Building2,
    href: "/directory",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "visa",
    name: "Visa & Legal",
    count: "320+ agents",
    icon: FileText,
    href: "/visa",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "travel",
    name: "Travel & Bus",
    count: "Daily routes",
    icon: Plane,
    href: "/travel",
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    id: "money",
    name: "Money Services",
    count: "Live rates",
    icon: Banknote,
    href: "/money",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    id: "education",
    name: "Courses & Schools",
    count: "150+ classes",
    icon: GraduationCap,
    href: "/education",
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "health",
    name: "Health & Care",
    count: "Clinics & help",
    icon: HeartPulse,
    href: "/health",
    color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
];

export interface TrendingCategoriesProps {
  categories?: TrendingCategory[];
  onCategoryClick?: (category: TrendingCategory) => void;
  className?: string;
}

export function TrendingCategories({
  categories = MOCK_TRENDING_CATEGORIES,
  onCategoryClick,
  className,
}: TrendingCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Trending Categories
      </h3>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.id}
              href={category.href}
              onClick={() => onCategoryClick?.(category)}
              className="group flex flex-col items-start rounded-xl border border-border/60 bg-card p-3 shadow-xs hover:border-primary/40 hover:bg-accent/50 transition-all"
            >
              <div
                className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg border ${category.color} transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">{category.count}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
