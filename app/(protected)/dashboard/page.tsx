"use client";

import Link from "next/link";
import {
  Briefcase,
  Building2,
  ShieldCheck,
  Plane,
  Banknote,
  Store,
  Calendar,
  Bot,
  Sparkles,
  ArrowRight,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Jobs & Careers",
    count: "4,500+",
    desc: "Factories, hospitality, logistics & tech positions",
    href: "/jobs",
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    title: "Housing & Rooms",
    count: "850+",
    desc: "Budget rooms, condos & worker apartments",
    href: "/housing",
    icon: Building2,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    title: "Ask Mingalar AI",
    count: "AI Active",
    desc: "24/7 Personal assistant for living in Thailand",
    href: "/ai",
    icon: Bot,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Visa & Legal Help",
    count: "Verified",
    desc: "90-day report, work permit & passport assistance",
    href: "/visa",
    icon: ShieldCheck,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    title: "Travel & Flights",
    count: "Top Deals",
    desc: "Bus tickets, flights & attractions guidance",
    href: "/travel",
    icon: Plane,
    color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  },
  {
    title: "Money Services",
    count: "Daily Rates",
    desc: "Daily exchange rates & trusted remittance info",
    href: "/money",
    icon: Banknote,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  {
    title: "Local Businesses",
    count: "12,000+",
    desc: "Myanmar restaurants, shops, clinics & services",
    href: "/directory",
    icon: Store,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  {
    title: "Community & Events",
    count: "Upcoming",
    desc: "Cultural celebrations, workshops & meetups",
    href: "/events",
    icon: Calendar,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-background p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
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
          <Button size="sm" className="rounded-2xl font-bold shadow-md shadow-primary/20 shrink-0">
            <Bot className="mr-1.5 h-4 w-4" /> Ask Mingalar AI
          </Button>
        </Link>
      </div>

      {/* Member Status Summary Cards */}
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

      {/* Explore All Services Grid (จากรูปภาพที่คุณสยามต้องการ) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Explore All Services</h2>
          <span className="text-xs text-muted-foreground">Quick access to essential resources</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href}>
                <div className="group rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${item.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {item.count}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                      {item.title}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
