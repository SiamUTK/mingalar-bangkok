"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, UserPlus } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

import { JobCard } from "./job-card";
import { JobFilters } from "./job-filters";

const jobs = [
  {
    id: "1",
    title: "Restaurant Supervisor",
    company: "Mingalar Restaurant",
    location: "Bangkok",
    salary: "฿25,000 - ฿35,000",
    type: "Full-time" as const,
    featured: true,
    urgent: true,
    verified: true,
    postedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Hotel Receptionist",
    company: "Bangkok City Hotel",
    location: "Silom, Bangkok",
    salary: "฿18,000 - ฿24,000",
    type: "Full-time" as const,
    featured: false,
    urgent: false,
    verified: true,
    postedAt: "5 hours ago",
  },
  {
    id: "3",
    title: "Warehouse Staff",
    company: "Thai Logistics Co., Ltd.",
    location: "Samut Prakan",
    salary: "฿17,000 - ฿22,000",
    type: "Full-time" as const,
    featured: false,
    urgent: true,
    verified: false,
    postedAt: "1 day ago",
  },
];

export function LatestJobsSection() {
  return (
    <AnimatedSection className="bg-muted/30 py-20 lg:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Career Opportunities
            </span>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Latest Jobs
            </h2>

            <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              Explore verified workplaces and career opportunities across Thailand designed for the
              Myanmar community.
            </p>
          </div>

          <Link href="/jobs">
            <Button variant="outline" className="rounded-2xl font-medium">
              View All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-10">
          <JobFilters />
        </div>

        {/* Jobs List */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* Registration CTA Card */}
        <div className="mt-14 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <UserPlus className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-2xl font-bold text-foreground">
            Want job recommendations matched to your skills?
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Create a free member profile to save jobs, upload your resume, and get instant job
            alerts sent to your dashboard.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                Create Free Account
              </Button>
            </Link>

            <Link href="/jobs">
              <Button size="lg" variant="outline" className="rounded-2xl font-medium">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

