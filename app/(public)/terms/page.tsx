"use client";

import Link from "next/link";
import { ArrowLeft, FileText, ShieldAlert, CheckCircle2, Scale } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function TermsPage() {
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
              <Scale className="h-3.5 w-3.5" /> Legal Terms
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Terms Body */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-10 space-y-8 text-sm leading-relaxed text-foreground">
          {/* Acceptance of Terms */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> 1. Acceptance of Terms
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              By accessing or using <strong>Mingalar Bangkok</strong> (a service provided by Siam On
              Cloud Co., Ltd.), you agree to be bound by these Terms of Service and our Privacy
              Policy. If you do not agree to these terms, please do not use our platform or AI
              services.
            </p>
          </section>

          {/* User Account Responsibilities */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> 2. Member Account & Security
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When creating an account on Mingalar Bangkok, you agree to:
            </p>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1.5">
              <li>Provide accurate, truthful, and complete information during registration.</li>
              <li>Maintain the confidentiality of your account password and login credentials.</li>
              <li>
                Notify us immediately of any unauthorized access or security breaches regarding your
                account.
              </li>
            </ul>
          </section>

          {/* Directory & Listings Usage */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" /> 3. Jobs, Housing & Business Listings
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mingalar Bangkok serves as an informational directory and bridge between workers,
              property owners, and business operators:
            </p>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1.5">
              <li>
                Users posting job vacancies, housing listings, or business services must ensure all
                content complies with applicable Thai laws.
              </li>
              <li>
                Misleading advertisements, fraudulent job offers, or abusive listings are strictly
                prohibited and will result in immediate account termination.
              </li>
              <li>
                Mingalar Bangkok is not an employment agency or real estate broker, and is not
                responsible for agreements made between users.
              </li>
            </ul>
          </section>

          {/* AI Assistant Disclaimer */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" /> 4. AI Assistant Disclaimer
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mingalar AI provides guidance on immigration, translation, and living in Thailand for
              informational purposes only. While we strive for accuracy, AI responses should not be
              considered formal legal, medical, or official government counsel. Users are advised to
              verify critical visa requirements with official Thai authorities.
            </p>
          </section>

          {/* Modifications & Contact */}
          <section className="space-y-3 pt-4 border-t border-border/40">
            <h2 className="text-lg font-bold text-foreground">5. Changes to Terms & Support</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the platform
              after changes implies acceptance of the updated terms. For legal inquiries or support,
              please contact us at <strong>info@siamon.cloud</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
