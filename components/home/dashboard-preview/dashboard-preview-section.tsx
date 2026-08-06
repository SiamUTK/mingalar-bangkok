"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck, Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { DashboardWidgets } from "./dashboard-widgets";

export function DashboardPreviewSection() {
  return (
    <AnimatedSection className="relative overflow-hidden py-20 lg:py-24 bg-linear-to-b from-background via-muted/30 to-background">
      <div className="container relative mx-auto px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Personalized Discover Hub
          </div>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Your Life in Thailand,{" "}
            <span className="bg-linear-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Organized in One Dashboard
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            When you create a free account, Mingalar Bangkok becomes your personal assistant. Get
            tailored job alerts, visa reminders, daily exchange rates, and saved favorites—all
            customized to where you live.
          </p>
        </div>

        {/* Interactive Dashboard Preview Box */}
        <div className="mt-12 rounded-3xl border border-border/80 bg-background/90 p-4 md:p-8 shadow-2xl backdrop-blur-xl">
          {/* Top Bar Preview */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <LayoutDashboard className="h-4 w-4 text-primary" />
              Member Discover Feed Preview
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Real-time Personalized Updates
            </div>
          </div>

          {/* Render Dashboard Widgets */}
          <DashboardWidgets />
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Ready to personalize your experience in Thailand?
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-2xl font-semibold shadow-lg shadow-primary/20 px-8"
            >
              Create Your Free Account Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
