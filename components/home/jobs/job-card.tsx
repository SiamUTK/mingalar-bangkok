"use client";

import Link from "next/link";

import { Banknote, BriefcaseBusiness, Building2, Clock3, Heart, MapPin } from "lucide-react";

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
  return (
    <article className="group rounded-4xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Building2 className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold transition group-hover:text-primary">{title}</h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <BriefcaseBusiness className="h-4 w-4" />

              <span>{company}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="rounded-full p-2 transition hover:bg-muted"
          aria-label="Save job"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        {featured && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Featured
          </span>
        )}

        {urgent && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            Urgent
          </span>
        )}

        {verified && (
          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
            Verified Employer
          </span>
        )}

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{type}</span>
      </div>

      {/* Information */}
      <div className="mt-6 grid gap-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />

          <span>{location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Banknote className="h-4 w-4 text-primary" />

          <span>{salary}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4 text-primary" />

          <span>Posted {postedAt}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex gap-3">
        <Link href={`/jobs/${id}`} className="flex-1">
          <Button className="flex-1">View Job</Button>
        </Link>

        <Link href={`/jobs/${id}/apply`}>
          <Button variant="outline">Apply</Button>
        </Link>
      </div>
    </article>
  );
}
