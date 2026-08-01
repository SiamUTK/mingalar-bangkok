"use client";

import { Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

import { AIChatPreview } from "./ai-chat-preview";
import { AIFeatureList } from "./ai-feature-list";

export function AISection() {
  return (
    <AnimatedSection className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
              Meet
              <span className="block bg-linear-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Mingalar AI
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Your intelligent assistant for everything in Thailand. Ask questions, discover trusted
              businesses, find jobs, search for housing, translate languages, and receive
              personalized recommendations in seconds.
            </p>

            <div className="mt-10">
              <AIFeatureList />
            </div>
          </div>

          {/* Right */}
          <div>
            <AIChatPreview />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
