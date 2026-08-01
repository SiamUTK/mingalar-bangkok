"use client";

import Link from "next/link";

import { ArrowRight, Bot, BriefcaseBusiness, Sparkles, Users } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <AnimatedSection className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-blue-700" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4" />
                Join Mingalar Bangkok
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
                Everything You Need
                <br />
                to Live in Thailand
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                Discover trusted businesses, find your next job, search for housing, explore local
                events, and get instant answers from Mingalar AI — all in one platform.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/ai-assistant">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
                  >
                    Try Mingalar AI
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <Bot className="h-10 w-10 text-white" />

                <h3 className="mt-5 text-xl font-bold text-white">AI Assistant</h3>

                <p className="mt-2 text-sm leading-7 text-white/75">
                  Ask anything about jobs, housing, travel, visas, healthcare and daily life in
                  Thailand.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <BriefcaseBusiness className="h-10 w-10 text-white" />

                <h3 className="mt-5 text-xl font-bold text-white">Trusted Directory</h3>

                <p className="mt-2 text-sm leading-7 text-white/75">
                  Explore verified businesses, restaurants, accommodation, services and local
                  recommendations.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur sm:col-span-2">
                <Users className="h-10 w-10 text-white" />

                <h3 className="mt-5 text-xl font-bold text-white">Community First</h3>

                <p className="mt-2 text-sm leading-7 text-white/75">
                  Built for the Myanmar community in Thailand with multilingual support, trusted
                  information and AI-powered assistance available 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
