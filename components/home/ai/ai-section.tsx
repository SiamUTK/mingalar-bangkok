"use client";

import { Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AIChatPreview } from "./ai-chat-preview";
import { AIFeatureList } from "./ai-feature-list";

export function AISection() {
  return (
    <AnimatedSection className="relative overflow-hidden py-20 lg:py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Heading & Features */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI-First Platform
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Ask{" "}
              <span className="inline-block bg-linear-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Mingalar AI
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Your intelligent companion for living, working, and thriving in Thailand. Ask
              questions, find jobs, search housing, get visa help, and receive personalized
              recommendations in seconds.
            </p>

            <div className="mt-8">
              <AIFeatureList />
            </div>
          </div>

          {/* Right Column: Interactive Chat Preview */}
          <div>
            <AIChatPreview />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

