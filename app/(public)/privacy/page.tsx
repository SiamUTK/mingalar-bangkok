"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, FileText, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function PrivacyPage() {
  const lastUpdated = "August 1, 2026";

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
              <ShieldCheck className="h-3.5 w-3.5" /> Data Protection
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Policy Content Body */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-10 space-y-8 text-sm leading-relaxed text-foreground">
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> 1. Commitment to Your Privacy
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              At <strong>Mingalar Bangkok</strong> (operated by Siam On Cloud Co., Ltd.), we respect
              your personal privacy and are committed to protecting the information you share with
              us. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              personal data when you visit our website, use our AI Assistant, or register for an
              account.
            </p>
          </section>

          {/* Information Collected */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> 2. Information We Collect
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We collect information that helps us provide you with personalized services,
              including:
            </p>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1.5">
              <li>
                <strong>Account Data:</strong> Name, phone number, email address, and language
                preferences upon registration.
              </li>
              <li>
                <strong>Service Requests:</strong> Information regarding job preferences, housing
                searches, or visa consultation requests.
              </li>
              <li>
                <strong>AI Interaction Logs:</strong> Queries submitted to Mingalar AI to improve AI
                accuracy and response quality.
              </li>
              <li>
                <strong>Usage & Technical Data:</strong> IP address, device type, and cookies for
                security and analytics.
              </li>
            </ul>
          </section>

          {/* How We Use Your Data */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> 3. How We Use Your Information
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your personal data is used strictly for legitimate business and community support
              purposes:
            </p>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1.5">
              <li>
                To connect job seekers with verified employers and landlords upon user consent.
              </li>
              <li>
                To send automated reminders for 90-day reports, visa renewals, and daily exchange
                rates.
              </li>
              <li>
                To power and train our multilingual AI Assistant for better translation and legal
                guidance.
              </li>
              <li>To maintain security and prevent fraudulent activity on our platform.</li>
            </ul>
          </section>

          {/* Data Sharing & Security */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> 4. Data Sharing & Protection
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>We never sell your personal data to third parties.</strong> Information is
              only shared with verified service partners (such as employers or landlords) when you
              explicitly request to contact them or submit an application. We employ
              industry-standard encryption protocols to protect your data in transit and at rest.
            </p>
          </section>

          {/* User Rights */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground">5. Your Privacy Rights</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You have the right to access, update, correct, or request the deletion of your
              personal account data at any time through your Profile Settings or by contacting our
              Support Team at <strong>info@siamon.cloud</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
