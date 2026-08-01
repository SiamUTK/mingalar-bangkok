"use client";

import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const visaServices = [
  {
    title: "90-Day Notification",
    description: "Assistance with online or in-person 90-day report filing with Thai Immigration.",
    price: "Consultation Available",
  },
  {
    title: "Work Permit Renewal",
    description: "Guidance on documentation and process for renewing MOU and Non-L work permits.",
    price: "Guided Assistance",
  },
  {
    title: "Passport Renewal Support",
    description: "Step-by-step guidance for renewing Myanmar passports in Thailand.",
    price: "Expert Consultation",
  },
  {
    title: "Visa Status Verification",
    description: "Check your immigration status and document validity through our AI assistant.",
    price: "Free with Member AI",
  },
];

export default function VisaPage() {
  const handleRequestConsultation = () => {
    toast("Sign in for Visa Services", {
      description:
        "Please create a free account or sign in to request legal consultations and document tracking.",
      action: {
        label: "Create Account",
        onClick: () => (window.location.href = "/register"),
      },
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
            <FileText className="h-3.5 w-3.5" /> Legal & Immigration
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Visa & Document Assistance
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          Trusted legal guidance, 90-day notification support, and passport renewal help for the
          Myanmar community in Thailand.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {visaServices.map((service) => (
          <div
            key={service.title}
            className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40">
              <span className="text-xs font-semibold text-primary">{service.price}</span>
              <Button
                onClick={handleRequestConsultation}
                size="sm"
                className="rounded-xl text-xs font-semibold"
              >
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Request Help
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Visa Assistant Banner */}
      <div className="mt-12 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-foreground">
          Have urgent questions about your visa?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Ask Mingalar AI right now to get instant step-by-step guidance on Thai immigration rules
          and passport extensions.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/ai">
            <Button size="lg" className="rounded-2xl font-semibold shadow-md shadow-primary/20">
              Ask AI Visa Assistant
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
