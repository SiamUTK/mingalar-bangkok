"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  FileText,
  Globe2,
  Heart,
  ShieldCheck,
  Sparkles,
  Users } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Community Members", value: "50,000+" },
  { label: "Verified Jobs Listed", value: "4,500+" },
  { label: "AI Conversations Helped", value: "100,000+" },
  { label: "Trusted Partners", value: "200+" },
];

const coreValues = [
  {
    icon: Bot,
    title: "AI-First Community Support",
    description:
      "Empowering everyday life with 24/7 AI translation, visa assistance, and job matching in Burmese, Thai, and English." },
  {
    icon: ShieldCheck,
    title: "Verified & Safe Listings",
    description:
      "Strict screening for workplaces, housing options, and service providers to ensure safety for all members." },
  {
    icon: Users,
    title: "Inclusive & Empowering",
    description:
      "Built with care to bridge cultural gaps, simplify administrative tasks, and help foreign workers thrive in Thailand." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedSection className="relative overflow-hidden bg-linear-to-b from-primary/10 via-background to-background py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> About Mingalar Bangkok
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Empowering the Myanmar Community in Thailand with{" "}
            <span className="bg-linear-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Smart AI Solutions
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Mingalar Bangkok is an AI-powered Super App designed to help people live, work, travel,
            and thrive in Thailand with confidence and trust.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur shadow-sm"
              >
                <div className="text-3xl font-black text-primary">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Our Mission
            </span>
            <h2 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">
              Making Living & Working in Thailand Simpler for Everyone
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Moving or living in another country comes with challenges—from language barriers and
              complex visa regulations to finding trustworthy housing and jobs. Mingalar Bangkok
              combines local directory services with cutting-edge AI assistance to deliver reliable
              guidance right to your fingertips.
            </p>
          </div>

          {/* Value Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{val.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* What We Offer Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-foreground md:text-4xl">
              What We Bring to Your Daily Life
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything integrated into a single unified platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-border/80 bg-card p-6">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <h4 className="font-bold text-foreground text-sm">Verified Job Opportunities</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Connect directly with trustworthy employers across factories, hospitality, retail,
                and skilled labor sectors.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-emerald-500" />
                <h4 className="font-bold text-foreground text-sm">Housing & Rooms</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Browse budget apartments, condos, and worker rooms near public transportation and
                workplaces.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-amber-500" />
                <h4 className="font-bold text-foreground text-sm">Visa & Legal Assistance</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Step-by-step guidance for 90-day reports, work permit renewals, and passport
                extensions.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-purple-500" />
                <h4 className="font-bold text-foreground text-sm">Mingalar AI Assistant</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Instant answers to legal questions, document translation, and daily assistance in
                Burmese & Thai.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-sky-500" />
                <h4 className="font-bold text-foreground text-sm">Travel & Money Info</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Up-to-date exchange rates, trusted remittance information, and travel booking
                recommendations.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-foreground text-sm">Community Events</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Cultural festivals, workshops, and legal aid meetups tailored for the community.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA Banner */}
      <AnimatedSection className="py-16 bg-linear-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-card p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl font-black text-foreground md:text-4xl">
              Ready to Join Mingalar Bangkok?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              Create a free account today to experience personalized AI recommendations, save job
              listings, and stay updated on important community alerts.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-2xl font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
