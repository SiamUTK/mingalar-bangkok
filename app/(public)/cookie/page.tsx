// app/(public)/cookie/page.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Cookie, Settings, ShieldAlert, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function CookiePage() {
  const lastUpdated = "August 8, 2026";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection className="border-b border-border/60 bg-linear-to-b from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Cookie className="h-3.5 w-3.5" /> Tracking & Preferences
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Cookie Policy
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Cookie Policy Body */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-10 space-y-8 text-sm leading-relaxed text-foreground">
          {/* What Are Cookies */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Cookie className="h-4 w-4 text-primary" /> 1. What Are Cookies?
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cookies are small text files placed on your device when you visit{" "}
              <strong>Mingalar Bangkok</strong> (operated by Siam On Cloud Co., Ltd.). They are
              widely used to make websites work efficiently, remember your language preferences
              (English, Burmese, or Thai), and provide analytical insights to our team.
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> 2. Types of Cookies We Use
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We utilize specific categories of cookies on our platform:
            </p>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1.5">
              <li>
                <strong>Essential Cookies:</strong> Required for core platform functionality,
                security, member authentication, and session management.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your regional choices, display
                settings, and selected language preferences.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with
                our directories, job boards, and AI tools so we can improve user experience.
              </li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" /> 3. Managing Your Cookie Preferences
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Most web browsers automatically accept cookies, but you can modify your browser
              settings to decline cookies if you prefer. Please note that disabling essential
              cookies may impact certain features, such as logging into your member dashboard or
              maintaining your active session.
            </p>
          </section>

          {/* Policy Updates & Contact */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" /> 4. Updates & Contact Information
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology or
              legal requirements. For any questions regarding our use of cookies, please contact us
              at <strong>info@siamon.cloud</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
