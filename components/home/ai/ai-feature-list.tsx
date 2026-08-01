"use client";

import { Bot, Briefcase, Home, FileText, Globe, Sparkles, MapPin } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Find Jobs",
    description: "Matches factory, hospitality, and tech jobs to your skills.",
  },
  {
    icon: Home,
    title: "Find Housing",
    description: "Locates rooms, condos, and rentals within your budget.",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Guides you through passport renewals, work permits, and 90-day reports.",
  },
  {
    icon: Globe,
    title: "Instant Translator",
    description: "Seamlessly translates between Myanmar, Thai, and English.",
  },
  {
    icon: MapPin,
    title: "Local Nearby Guide",
    description: "Finds trusted restaurants, clinics, translators, and banks nearby.",
  },
  {
    icon: Sparkles,
    title: "24/7 Personal Concierge",
    description: "Answers all your everyday questions about living and working in Thailand.",
  },
];

export function AIFeatureList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="group flex gap-3.5 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Summary Box */}
      <div className="sm:col-span-2 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-foreground">Powered by Mingalar AI Engine</h4>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Designed specifically to support the Myanmar community in Thailand with real-time,
            accurate assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
