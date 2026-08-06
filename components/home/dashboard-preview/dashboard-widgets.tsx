"use client";


import {
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Heart,
  MapPin,
  Sparkles,
  TrendingUp } from "lucide-react";



export function DashboardWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-left">
      {/* 1. Daily AI Greeting & Insight */}
      <div className="rounded-3xl border border-primary/20 bg-card p-5 shadow-sm md:col-span-2 lg:col-span-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-md">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-foreground">Good Morning, Kyaw! ☀️</h4>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                  Samut Sakhon
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Here is your personalized daily update for living & working in Thailand.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            AI Suggestion: Renew 90-day report in 14 days
          </div>
        </div>
      </div>

      {/* 2. Visa & Legal Reminder */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <FileText className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-sm text-foreground">Visa & Permit Tracker</h5>
          </div>
          <span className="text-[11px] font-semibold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
            Action Needed
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-3 text-xs">
            <div>
              <p className="font-semibold text-foreground">90-Day Notification</p>
              <p className="text-muted-foreground text-[11px]">Due Date: 15 Aug 2026</p>
            </div>
            <span className="font-bold text-amber-600">14 Days Left</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-3 text-xs">
            <div>
              <p className="font-semibold text-foreground">Work Permit Renewal</p>
              <p className="text-muted-foreground text-[11px]">Status: Valid</p>
            </div>
            <span className="font-semibold text-emerald-600">Valid until Nov 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Exchange Rate Widget */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Banknote className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-sm text-foreground">Today&apos;s Exchange Rate</h5>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> +0.4%
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-3">
            <span className="text-xs text-muted-foreground font-medium">100 THB ➔ MMK</span>
            <span className="text-sm font-black text-foreground">12,450 MMK</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Updated 10 mins ago • Trusted remittance agents available
          </p>
        </div>
      </div>

      {/* 4. Jobs Nearby (Personalized Location) */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <Briefcase className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-sm text-foreground">Jobs Near Samut Sakhon</h5>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="rounded-2xl bg-muted/50 p-3 text-xs">
            <div className="flex justify-between items-start">
              <p className="font-bold text-foreground">Seafood Factory Supervisor</p>
              <span className="text-primary font-bold">฿22,000</span>
            </div>
            <p className="text-muted-foreground text-[11px] mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" /> Mahachai, Samut Sakhon
            </p>
          </div>
        </div>
      </div>

      {/* 5. Saved Housing & Favorites */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
              <Heart className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-sm text-foreground">Saved Items (3)</h5>
          </div>
          <span className="text-xs text-primary font-semibold">View All</span>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-3 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Studio Room near Mahachai</span>
            </div>
            <span className="font-bold text-foreground">฿3,500/mo</span>
          </div>
        </div>
      </div>

      {/* 6. Community & Events Alert */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/40 transition-all md:col-span-2 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Compass className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-sm text-foreground">Community & Upcoming Events</h5>
          </div>
          <span className="text-xs text-muted-foreground">This Weekend</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted/50 p-3 text-xs">
            <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600">
              Workshop
            </span>
            <p className="font-bold text-foreground mt-1.5">Free Thai Language Class for Workers</p>
            <p className="text-muted-foreground text-[11px] mt-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Sunday, 10:00 AM
            </p>
          </div>

          <div className="rounded-2xl bg-muted/50 p-3 text-xs">
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              Community Help
            </span>
            <p className="font-bold text-foreground mt-1.5">Mobile Legal Aid Consultation</p>
            <p className="text-muted-foreground text-[11px] mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Saturday, All Day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
