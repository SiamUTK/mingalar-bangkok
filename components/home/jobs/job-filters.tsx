"use client";

import { BriefcaseBusiness, Filter, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All Categories",
  "Factory",
  "Restaurant",
  "Hotel",
  "Retail",
  "Healthcare",
  "Logistics",
  "Construction",
];

const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship", "Remote"];

export function JobFilters() {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm md:rounded-4xl">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Find Your Next Job</h3>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[2fr_1fr_1fr_auto]">
        {/* Keyword Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Job title, company or skill..."
            className="pl-11 rounded-2xl border-border/80 bg-background"
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Bangkok, Samut Sakhon..."
            className="pl-11 rounded-2xl border-border/80 bg-background"
          />
        </div>

        {/* Job Type Dropdown */}
        <select className="h-10 rounded-2xl border border-border/80 bg-background px-4 text-sm outline-none transition focus:border-primary">
          {jobTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* Search Button */}
        <Button className="rounded-2xl font-semibold px-6">Search Jobs</Button>
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="rounded-full border border-border/80 bg-background px-3.5 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Popular Searches */}
      <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
          Popular:
        </span>

        {["Myanmar Speaker", "Factory Staff", "Restaurant", "Hotel", "Warehouse", "Sales"].map(
          (item) => (
            <button
              key={item}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
            >
              <BriefcaseBusiness className="h-3 w-3" />
              {item}
            </button>
          )
        )}
      </div>
    </div>
  );
}

