"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const benefits = [
  "Save Jobs & Housing Listings",
  "Ask Mingalar AI Unlimited Questions",
  "Personalized Discover Dashboard",
  "Visa Expiry & 90-Day Alerts",
  "100% Free Forever",
];

export function CTASection() {
  return (
    <AnimatedSection className="py-20 bg-linear-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-card p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_70%) pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Join Today
          </span>

          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
            Start Your Life in Thailand with{" "}
            <span className="bg-linear-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Mingalar Bangkok
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Create your free account now to unlock full AI assistance, job matching, housing saves,
            and personalized community alerts.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-foreground">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-2xl font-semibold shadow-lg shadow-primary/20 px-8"
              >
                Create Your Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
