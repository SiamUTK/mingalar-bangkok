// components/home/jobs/job-card.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Heart,
  Lock,
  MapPin,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  featured?: boolean;
  urgent?: boolean;
  verified?: boolean;
  postedAt: string;
  applicantCount?: number;
  isNew?: boolean;
}

export function JobCard({
  id,
  title,
  company,
  location,
  salary,
  type,
  featured = false,
  urgent = false,
  verified = false,
  postedAt,
  applicantCount = 14,
  isNew = false,
}: JobCardProps) {
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  // TODO: Replace with actual authentication state
  const isAuthenticated = false;

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      toast("Sign in to Save Jobs", {
        description: "Create a free account to bookmark jobs and receive alert updates.",
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
      return;
    }

    setIsSaved((prev) => !prev);

    toast.success(isSaved ? "Removed from saved jobs." : "Job saved to your profile!");
  };

  const handleApplyJob = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAuthenticated) return;

    e.preventDefault();

    toast("Sign in to Apply", {
      description: "You need a free account to apply directly and send your CV to employers.",
      action: {
        label: "Sign In",
        onClick: () => router.push("/login"),
      },
    });
  };

  return (
    <article className="group relative rounded-3xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl md:rounded-4xl flex flex-col justify-between">
      <div>
        {/* Urgency Activity Bar */}
        {urgent && (
          <div className="mb-4 flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 w-fit border border-amber-500/20">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{applicantCount} people applied in the last 24 hours</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#aa2429]/10 text-[#aa2429] shadow-inner shrink-0">
              <Building2 className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold transition group-hover:text-[#aa2429] md:text-xl line-clamp-1">
                {title}
              </h3>

              <div className="mt-1 flex items-center gap-2 text-xs font-medium text-muted-foreground md:text-sm">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                <span>{company}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveJob}
            className={`rounded-full p-2.5 transition-colors ${
              isSaved
                ? "bg-rose-500/10 text-rose-500"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            aria-label="Save job"
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Badges */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {featured && (
            <span className="rounded-full bg-[#aa2429] px-3 py-1 text-xs font-semibold text-white shadow-xs">
              Featured
            </span>
          )}

          {urgent && (
            <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow-xs">
              Urgent
            </span>
          )}

          {verified && (
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-xs">
              Verified Employer
            </span>
          )}

          {isNew && (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-500/20">
              NEW
            </span>
          )}

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{type}</span>
        </div>

        {/* Job Details Grid */}
        <div className="mt-6 grid gap-2.5">
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
            <MapPin className="h-4 w-4 shrink-0 text-[#aa2429]" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
            <Banknote className="h-4 w-4 shrink-0 text-[#aa2429]" />
            <span className="font-bold text-foreground">{salary}</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
            <Clock3 className="h-4 w-4 shrink-0 text-[#aa2429]" />
            <span>Posted {postedAt}</span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-3">
        <Link href={`/jobs/${id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full rounded-2xl font-medium border-border hover:border-[#aa2429]/50"
          >
            View Details
          </Button>
        </Link>

        <Link href={`/jobs/${id}/apply`} onClick={handleApplyJob}>
          <Button className="rounded-2xl font-semibold bg-[#aa2429] hover:bg-[#8e1e22] text-white shadow-md shadow-[#aa2429]/20">
            <Lock className="mr-1.5 h-3.5 w-3.5" />
            Apply
          </Button>
        </Link>
      </div>
    </article>
  );
}
