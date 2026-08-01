"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // จำลองการส่งข้อมูล
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. Our team will get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AnimatedSection className="border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background py-12 lg:py-16">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <MessageSquare className="h-3.5 w-3.5" /> Get in Touch
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              We&apos;re Here to Help You
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Have questions about jobs, housing, visa assistance, or platform features? Reach out
              to our team anytime.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content: Form & Contact Info */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Side: Contact Information Cards */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Contact Information</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Feel free to contact us directly or visit our office during business hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Address</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    14/89 Flat 2, 8th Floor, Soi Plookchit, Rama 4 Road, Lumphini, Pathumwan,
                    Bangkok 10330, Thailand
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Phone</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    +66 99 000 9588, +66 87 112 5025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Email</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">info@mingalarbangkok.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Office Hours</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Monday – Friday: 09:00 AM – 06:00 PM (ICT)
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistant Callout */}
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Sparkles className="h-4 w-4" />
                Need Instant Answers?
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Try asking Mingalar AI! Our 24/7 assistant can instantly help with visa rules,
                translation, and local directory inquiries.
              </p>
              <Link href="/ai" className="mt-4 inline-block">
                <Button size="sm" className="rounded-xl text-xs font-bold">
                  Ask Mingalar AI
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Send Us a Message</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Fill in the form below and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Aung Kyaw"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-xl border-border/80 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl border-border/80 text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      Phone Number (Optional)
                    </label>
                    <Input
                      placeholder="+66 90 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl border-border/80 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="flex h-9 w-full rounded-xl border border-border/80 bg-background px-3 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Jobs & Employers">Jobs & Employers Inquiry</option>
                      <option value="Housing & Property">Housing Listing Inquiry</option>
                      <option value="Visa & Legal Help">Visa & Legal Help</option>
                      <option value="Partnership">Business Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <Textarea
                    placeholder="How can we help you today?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-xl border-border/80 text-xs resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl font-bold shadow-md shadow-primary/20 py-2.5 text-xs"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
