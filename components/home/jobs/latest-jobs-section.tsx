"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <AnimatedSection className="bg-muted/20 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Career Opportunities
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Latest Jobs</h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Explore verified job opportunities across Thailand for the Myanmar community.
            </p>
          </div>

          <Link href="/jobs">
            <Button variant="outline">
              View All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-12">
          <JobFilters />
        </div>

        {/* Jobs */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/jobs">
            <Button size="lg">Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
