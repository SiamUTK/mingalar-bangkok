"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Home,
  Building2,
  FileText,
  Plane,
  Banknote,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

import { hoverScale, staggerContainer, staggerItem } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "jobs" | "housing" | "business" | "visa" | "travel" | "money" | string;
  location?: string;
  price?: string;
  rating?: number;
  reviewsCount?: number;
  href: string;
  badgeText?: string;
  updatedAt?: string;
}

export interface UnifiedSearchResultsProps {
  results: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  jobs: {
    icon: Briefcase,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    label: "Job",
  },
  housing: {
    icon: Home,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    label: "Housing",
  },
  business: {
    icon: Building2,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    label: "Business",
  },
  visa: {
    icon: FileText,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    label: "Visa",
  },
  travel: {
    icon: Plane,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    label: "Travel",
  },
  money: {
    icon: Banknote,
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    label: "Money",
  },
};

export function UnifiedSearchResults({
  results,
  onResultClick,
  className,
}: UnifiedSearchResultsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (results.length === 0) return null;

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      className={`space-y-3 ${className ?? ""}`}
    >
      {results.map((result) => {
        const config = CATEGORY_CONFIG[result.category] ?? {
          icon: Building2,
          color: "text-primary bg-primary/10 border-primary/20",
          label: result.category,
        };
        const Icon = config.icon;

        return (
          <motion.div key={result.id} variants={shouldReduceMotion ? undefined : staggerItem}>
            <Link href={result.href} onClick={() => onResultClick?.(result)} className="block">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : hoverScale}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-4 shadow-xs transition-all duration-200 hover:border-primary/40 hover:bg-accent/40 hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3.5 overflow-hidden">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${config.color} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                        {config.label}
                      </Badge>
                      {result.badgeText && (
                        <Badge className="bg-primary/10 text-primary text-[10px] border-primary/20">
                          {result.badgeText}
                        </Badge>
                      )}
                    </div>

                    <h4 className="mt-1 text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {result.title}
                    </h4>

                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {result.description}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {result.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{result.location}</span>
                        </span>
                      )}

                      {result.rating !== undefined && (
                        <span className="flex items-center gap-1 font-semibold text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span>{result.rating}</span>
                          {result.reviewsCount !== undefined && (
                            <span className="text-muted-foreground font-normal">
                              ({result.reviewsCount})
                            </span>
                          )}
                        </span>
                      )}

                      {result.updatedAt && (
                        <span className="text-[11px] text-muted-foreground/80">
                          {result.updatedAt}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 sm:mt-0 sm:border-0 sm:pt-0 sm:pl-4 shrink-0">
                  {result.price ? (
                    <span className="text-sm font-bold text-primary sm:text-base">
                      {result.price}
                    </span>
                  ) : (
                    <span />
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors ml-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
