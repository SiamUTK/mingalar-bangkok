"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Store,
  Trash2,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { Button } from "@/components/ui/button";

const mockSavedJobs = [
  {
    id: "job-1",
    title: "Bilingual Supervisor (Thai-Burmese)",
    company: "Mahachai Seafood Co., Ltd.",
    location: "Samut Sakhon",
    salary: "฿18,000 - ฿22,000 / month",
  },
  {
    id: "job-2",
    title: "Warehouse Staff & Logistic Support",
    company: "Bangkok Logistics Express",
    location: "Bang Na, Bangkok",
    salary: "฿15,000 - ฿17,000 / month",
  },
];

const mockSavedHousing = [
  {
    id: "house-1",
    title: "Charming Studio Apartment near BTS On Nut",
    location: "Sukhumvit 77, Bangkok",
    price: "฿4,500 / month",
  },
];

const mockSavedEvents = [
  {
    id: "evt-1",
    title: "Thingyan Water Festival Celebration 2026",
    date: "Sun, 12 Apr 2026",
    location: "Bangkok Cultural Center",
  },
];

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "housing" | "events">("jobs");
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  const [savedHousing, setSavedHousing] = useState(mockSavedHousing);
  const [savedEvents, setSavedEvents] = useState(mockSavedEvents);

  const removeItem = (type: "jobs" | "housing" | "events", id: string) => {
    if (type === "jobs") {
      setSavedJobs(savedJobs.filter((item) => item.id !== id));
    } else if (type === "housing") {
      setSavedHousing(savedHousing.filter((item) => item.id !== id));
    } else if (type === "events") {
      setSavedEvents(savedEvents.filter((item) => item.id !== id));
    }
    toast.success("Item removed from saved list");
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-6 max-w-5xl space-y-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Dashboard
          </Link>

          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Bookmark className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-black text-foreground">Saved Bookmarks</h1>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Manage your saved jobs, housing listings, and upcoming community events in one
                place.
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-border/60 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "jobs"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" /> Jobs ({savedJobs.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("housing")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "housing"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" /> Housing ({savedHousing.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "events"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" /> Events ({savedEvents.length})
            </button>
          </div>

          {/* Saved Tab Content */}
          <div className="space-y-4 pt-2">
            {/* Jobs Tab */}
            {activeTab === "jobs" &&
              (savedJobs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                          {job.salary}
                        </span>
                        <h3 className="mt-2 text-base font-bold text-foreground">{job.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                        <Link href="/jobs" className="flex-1">
                          <Button size="sm" className="w-full rounded-xl text-xs font-semibold">
                            Apply Now
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem("jobs", job.id)}
                          className="rounded-xl p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState label="No saved jobs found." href="/jobs" buttonText="Browse Jobs" />
              ))}

            {/* Housing Tab */}
            {activeTab === "housing" &&
              (savedHousing.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedHousing.map((house) => (
                    <div
                      key={house.id}
                      className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-sky-600 bg-sky-500/10 px-2.5 py-0.5 rounded-full">
                          {house.price}
                        </span>
                        <h3 className="mt-2 text-base font-bold text-foreground">{house.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                          <span>{house.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                        <Link href="/housing" className="flex-1">
                          <Button
                            size="sm"
                            className="w-full rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white"
                          >
                            View Listing
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem("housing", house.id)}
                          className="rounded-xl p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  label="No saved housing listings found."
                  href="/housing"
                  buttonText="Browse Housing"
                />
              ))}

            {/* Events Tab */}
            {activeTab === "events" &&
              (savedEvents.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {savedEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                          {evt.date}
                        </span>
                        <h3 className="mt-2 text-base font-bold text-foreground">{evt.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{evt.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                        <Link href="/events" className="flex-1">
                          <Button
                            size="sm"
                            className="w-full rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Event Details
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem("events", evt.id)}
                          className="rounded-xl p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  label="No saved community events found."
                  href="/events"
                  buttonText="Browse Events"
                />
              ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

function EmptyState({
  label,
  href,
  buttonText,
}: {
  label: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-10 text-center space-y-3">
      <Bookmark className="mx-auto h-10 w-10 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <Link href={href} className="inline-block">
        <Button size="sm" className="rounded-xl text-xs font-semibold">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
