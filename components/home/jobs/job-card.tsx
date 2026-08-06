"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banknote, BriefcaseBusiness, Building2, Clock3, Heart, Lock, MapPin } from "lucide-react";
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
    <article className="group rounded-3xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl md:rounded-4xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <Building2 className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-lg font-bold transition group-hover:text-primary md:text-xl">
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

      <div className="mt-5 flex flex-wrap gap-2">
        {featured && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            Featured
          </span>
        )}

        {urgent && (
          <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Urgent
          </span>
        )}

        {verified && (
          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Verified Employer
          </span>
        )}

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{type}</span>
      </div>

      <div className="mt-6 grid gap-2.5">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
          <Banknote className="h-4 w-4 shrink-0 text-primary" />
          <span className="font-semibold text-foreground">{salary}</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-muted-foreground md:text-sm">
          <Clock3 className="h-4 w-4 shrink-0 text-primary" />
          <span>Posted {postedAt}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href={`/jobs/${id}`} className="flex-1">
          <Button variant="outline" className="w-full rounded-2xl font-medium">
            View Details
          </Button>
        </Link>

        <Link href={`/jobs/${id}/apply`} onClick={handleApplyJob}>
          <Button className="rounded-2xl font-semibold shadow-md shadow-primary/20">
            <Lock className="mr-1.5 h-3.5 w-3.5" />
            Apply
          </Button>
        </Link>
      </div>
    </article>
  );
}

