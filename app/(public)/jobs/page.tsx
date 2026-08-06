"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Briefcase } from "lucide-react";
import { JobCard } from "@/components/home/jobs/job-card";
import { JobFilters } from "@/components/home/jobs/job-filters";
import { Button } from "@/components/ui/button";

const allJobs = [
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
  {
    id: "4",
    title: "Factory Line Worker",
    company: "Mahachai Seafood Industry",
    location: "Samut Sakhon",
    salary: "฿16,500 - ฿20,000",
    type: "Full-time" as const,
    featured: true,
    urgent: true,
    verified: true,
    postedAt: "3 hours ago",
  },
  {
    id: "5",
    title: "Bilingual Sales Representative",
    company: "Siam Trading Group",
    location: "Pathum Thani",
    salary: "฿22,000 - ฿30,000",
    type: "Full-time" as const,
    featured: false,
    urgent: false,
    verified: true,
    postedAt: "1 day ago",
  },
  {
    id: "6",
    title: "Construction Supervisor",
    company: "Bangkok Build Co.",
    location: "Nonthaburi",
    salary: "฿28,000 - ฿38,000",
    type: "Contract" as const,
    featured: false,
    urgent: false,
    verified: true,
    postedAt: "2 days ago",
  },
];

export default function JobsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Top Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
        </Link>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Briefcase className="h-3.5 w-3.5" /> Career Opportunities
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Browse All Job Openings
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Find verified workplaces across Thailand tailored for the Myanmar community.
            </p>
          </div>

          <Link href="/register">
            <Button className="rounded-2xl font-semibold shadow-md shadow-primary/20">
              Create Account for Job Alerts
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-10">
        <JobFilters />
      </div>

      {/* Job Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      {/* Conversion Banner at Bottom */}
      <div className="mt-16 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-foreground">
          Want personalized job recommendations?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Create a free account to upload your CV, save jobs, and receive direct messages from
          employers.
        </p>
        <div className="mt-6">
          <Link href="/register">
            <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
              Create Free Account Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
