"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileCheck,
  Briefcase,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle } from "lucide-react";

import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { Button } from "@/components/ui/button";

const mockJobApplications = [
  {
    id: "app-101",
    jobTitle: "Bilingual Supervisor (Thai-Burmese)",
    company: "Mahachai Seafood Co., Ltd.",
    appliedDate: "Jul 28, 2026",
    status: "Interview Scheduled",
    statusType: "success", // pending, success, in_review
    note: "Interview scheduled on Aug 5, 2026 at 10:00 AM." },
  {
    id: "app-102",
    jobTitle: "Warehouse Staff & Logistics Helper",
    company: "Bangkok Express Logistics",
    appliedDate: "Jul 20, 2026",
    status: "Under Review",
    statusType: "in_review",
    note: "Application submitted and received by HR team." },
];

const mockVisaRequests = [
  {
    id: "req-201",
    serviceName: "Online 90-Day Report Assistance",
    submittedDate: "Jul 25, 2026",
    status: "Completed",
    statusType: "success",
    note: "Receipt generated and approved by Thai Immigration." },
  {
    id: "req-202",
    serviceName: "MOU Work Permit Extension Renewal",
    submittedDate: "Jul 15, 2026",
    status: "Processing Documents",
    statusType: "in_review",
    note: "Document verification in progress at Department of Employment." },
];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "visa">("jobs");

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
                  <FileCheck className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-black text-foreground">My Applications & Requests</h1>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Track your job application progress, interview schedules, and submitted visa
                requests.
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
              <Briefcase className="h-3.5 w-3.5" /> Job Applications ({mockJobApplications.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("visa")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "visa"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Visa & Legal Requests (
              {mockVisaRequests.length})
            </button>
          </div>

          {/* Applications List */}
          <div className="space-y-4 pt-2">
            {/* Jobs Tab */}
            {activeTab === "jobs" &&
              (mockJobApplications.length > 0 ? (
                <div className="space-y-3">
                  {mockJobApplications.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                        <div>
                          <h3 className="text-base font-bold text-foreground">{app.jobTitle}</h3>
                          <p className="text-xs text-muted-foreground">{app.company}</p>
                        </div>
                        <StatusBadge type={app.statusType} text={app.status} />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>
                            Applied on:{" "}
                            <strong className="text-foreground">{app.appliedDate}</strong>
                          </span>
                        </div>
                        <p className="text-xs italic bg-muted/30 px-3 py-1.5 rounded-xl border border-border/40 text-foreground">
                          {app.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  label="No job applications submitted yet."
                  href="/jobs"
                  buttonText="Find Jobs"
                />
              ))}

            {/* Visa Requests Tab */}
            {activeTab === "visa" &&
              (mockVisaRequests.length > 0 ? (
                <div className="space-y-3">
                  {mockVisaRequests.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                        <div>
                          <h3 className="text-base font-bold text-foreground">{req.serviceName}</h3>
                          <p className="text-xs text-muted-foreground">Request ID: {req.id}</p>
                        </div>
                        <StatusBadge type={req.statusType} text={req.status} />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span>
                            Submitted on:{" "}
                            <strong className="text-foreground">{req.submittedDate}</strong>
                          </span>
                        </div>
                        <p className="text-xs italic bg-muted/30 px-3 py-1.5 rounded-xl border border-border/40 text-foreground">
                          {req.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  label="No visa or legal requests found."
                  href="/visa"
                  buttonText="Explore Visa Help"
                />
              ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

function StatusBadge({ type, text }: { type: string; text: string }) {
  if (type === "success") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 self-start sm:self-auto">
        <CheckCircle2 className="h-3.5 w-3.5" /> {text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 self-start sm:self-auto">
      <AlertCircle className="h-3.5 w-3.5" /> {text}
    </span>
  );
}

function EmptyState({
  label,
  href,
  buttonText }: {
  label: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-10 text-center space-y-3">
      <FileCheck className="mx-auto h-10 w-10 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <Link href={href} className="inline-block">
        <Button size="sm" className="rounded-xl text-xs font-semibold">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
