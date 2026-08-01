"use client";

import { BrainCircuit, ShieldCheck, Languages, Users } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Search",
    description:
      "Discover businesses, jobs, housing, and travel recommendations with intelligent search.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Listings",
    description:
      "Quality listings with moderation and verification designed to build community trust.",
  },
  {
    icon: Languages,
    title: "Multi-language",
    description:
      "Built for Myanmar people living in Thailand with English, Thai, and Myanmar language support.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "More than a directory — a platform connecting people, businesses, and opportunities.",
  },
];

export function TrustedSection() {
  return (
    <AnimatedSection className="border-y bg-muted/30">
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Why Mingalar Bangkok
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Built for the Myanmar Community in Thailand
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            One platform to discover trusted businesses, career opportunities, housing, local
            services, and AI-powered assistance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
