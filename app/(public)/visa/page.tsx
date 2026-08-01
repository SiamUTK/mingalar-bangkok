"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Clock,
  Sparkles,
  Lock,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bot,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const visaCategories = [
  "All Services",
  "90-Day Report",
  "Work Permit (MOU)",
  "Passport Renewal",
  "TM30 Notification",
];

const mockVisaServices = [
  {
    id: "1",
    title: "Online 90-Day Reporting Guide & Support",
    category: "90-Day Report",
    processingTime: "1 - 3 Days",
    difficulty: "Easy (Online Available)",
    description:
      "Step-by-step guidance and document verification for submitting your official 90-day notification to Thai Immigration online.",
    badge: "Most Popular",
  },
  {
    id: "2",
    title: "MOU Work Permit Extension (2026 Rules)",
    category: "Work Permit (MOU)",
    processingTime: "7 - 14 Days",
    difficulty: "Requires Employer Docs",
    description:
      "Complete legal documentation support, health checkup guidance, and Department of Employment submission for MOU workers.",
    badge: "Urgent Deadline",
  },
  {
    id: "3",
    title: "Myanmar Passport Renewal & Extension",
    category: "Passport Renewal",
    processingTime: "2 - 4 Weeks",
    difficulty: "Embassy Appointment",
    description:
      "Assistance with embassy queues, photo specs, form preparation, and status tracking for renewing Myanmar PJ/PV passports in Thailand.",
    badge: "Essential",
  },
  {
    id: "4",
    title: "TM30 House Notification Setup",
    category: "TM30 Notification",
    processingTime: "24 Hours",
    difficulty: "Landlord Action Required",
    description:
      "Clear instructions for landlords or foreign workers to report place of stay within 24 hours of moving into a new residence.",
    badge: "Mandatory",
  },
];

export default function VisaPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const isAuthenticated = false; // guest status simulation

  const handleLockedAction = (actionName: string) => {
    if (!isAuthenticated) {
      toast(`Sign in to ${actionName}`, {
        description: `Please create a free account to ${actionName.toLowerCase()} and set up automated visa expiry alerts.`,
        action: {
          label: "Create Account",
          onClick: () => (window.location.href = "/register"),
        },
      });
    }
  };

  const filteredServices = mockVisaServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "All Services" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection className="border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
              <ShieldCheck className="h-3.5 w-3.5" /> Visa & Legal Assistance
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Thai Visa & Work Permit Services
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Simplified legal guidance for 90-day reports, MOU work permits, passport extensions,
              and TM30 rules.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search visa procedures (e.g., 90-day, MOU, Passport)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
            <Button
              onClick={() => handleLockedAction("Set Visa Expiry Alert")}
              className="h-11 rounded-2xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white shrink-0"
            >
              <Bell className="mr-1.5 h-4 w-4" /> Set 90-Day Alert
            </Button>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {visaCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/80 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Main Visa Services Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-600">
                    {service.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {service.category}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-muted/30 p-3 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>
                      Time: <strong className="text-foreground">{service.processingTime}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>
                      Type: <strong className="text-foreground">{service.difficulty}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-2 pt-4 border-t border-border/40">
                <Button
                  onClick={() => handleLockedAction("Start Visa Application")}
                  size="sm"
                  className="flex-1 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  View Checklist & Steps
                </Button>
                <Button
                  onClick={() => handleLockedAction("Consult AI on Visa")}
                  variant="outline"
                  size="sm"
                  className="rounded-xl px-3"
                >
                  <Lock className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Assistant Callout Banner */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Bot className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Confused About Visa Requirements or Documents?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Ask Mingalar AI for instant 24/7 legal guidance on 90-day reports, work permits, or
            required forms in Burmese & Thai.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/ai">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Ask Mingalar AI Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-2xl font-semibold">
                Contact Legal Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
