"use client";

import Link from "next/link";
import {
  Briefcase,
  Building2,
  FileText,
  Bell,
  Sparkles,
  ArrowRight,
  Bot,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-[11px] font-bold text-primary">
            <Sparkles className="h-3 w-3" /> Member Dashboard
          </span>
          <h1 className="mt-2 text-2xl font-black text-foreground md:text-3xl">
            Mingalarbar! Welcome back 👋
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Your personalized hub for jobs, 90-day report tracking, and AI assistance.
          </p>
        </div>

        <Link href="/ai">
          <Button size="md" className="rounded-2xl font-bold shadow-md shadow-primary/20 shrink-0">
            <Bot className="mr-1.5 h-4 w-4" /> Ask Mingalar AI
          </Button>
        </Link>
      </div>

      {/* Status Summary Widgets */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Visa Status</span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">Valid</div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">90-Day Report in 42 days</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Saved Jobs</span>
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">3 Positions</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Samut Sakhon & Bangkok</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Saved Rooms</span>
            <Building2 className="h-4 w-4 text-sky-500" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">2 Listings</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Near BTS Sukhumvit</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Rate Alerts</span>
            <Bell className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">Active</div>
          <p className="mt-1 text-[11px] text-muted-foreground">1 THB = 118.5 MMK</p>
        </div>
      </div>
    </div>
  );
}
