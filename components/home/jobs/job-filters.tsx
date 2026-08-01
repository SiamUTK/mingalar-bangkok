"use client";

import { BriefcaseBusiness, Filter, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All Categories",
  "Restaurant",
  "Hotel",
  "Retail",
  "Healthcare",
  "Education",
  "Logistics",
  "Construction",
];

const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship", "Remote"];

export function JobFilters() {
  return (
    <div className="rounded-4xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />

        <h3 className="text-lg font-semibold">Find Your Next Job</h3>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto]">
        {/* Keyword */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Job title, company or keyword..." className="pl-11" />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Bangkok" className="pl-11" />
        </div>

        {/* Job Type */}
        <select className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary">
          {jobTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* Search */}
        <Button className="h-11">Search</Button>
      </div>

      {/* Categories */}
      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="rounded-full border border-border bg-background px-4 py-2 text-sm transition-all hover:border-primary hover:bg-primary/5"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Popular Searches */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Popular:</span>

        {["Myanmar Speaker", "Restaurant", "Hotel", "Warehouse", "Sales", "Remote"].map((item) => (
          <button
            key={item}
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm transition hover:bg-primary/10 hover:text-primary"
          >
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
