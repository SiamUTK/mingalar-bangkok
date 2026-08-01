"use client";

import { Bot, BriefcaseBusiness, House, Languages, MapPinned, Plane, Sparkles } from "lucide-react";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Find Jobs",
    description: "Discover jobs that match your skills and preferred location.",
  },
  {
    icon: House,
    title: "Find Housing",
    description: "Search apartments, condos and rooms across Thailand.",
  },
  {
    icon: Plane,
    title: "Travel Assistant",
    description: "Get travel recommendations, attractions and transportation tips.",
  },
  {
    icon: Languages,
    title: "Instant Translation",
    description: "Translate between Myanmar, Thai and English in seconds.",
  },
  {
    icon: MapPinned,
    title: "Local Recommendations",
    description: "Find nearby restaurants, clinics, schools and trusted services.",
  },
  {
    icon: Sparkles,
    title: "AI Concierge",
    description: "Ask anything about living, working or travelling in Thailand.",
  },
];

export function AIFeatureList() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="group flex gap-4 rounded-3xl border border-border/60 bg-background/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-semibold">{feature.title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        );
      })}

      <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>

          <div>
            <h3 className="font-semibold">Powered by Mingalar AI</h3>

            <p className="text-sm text-muted-foreground">AI assistance available 24/7</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Our AI is designed to help the Myanmar community with everyday questions about work,
          housing, travel, local services and life in Thailand.
        </p>
      </div>
    </div>
  );
}
