"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  HelpCircle,
  Search,
  ChevronDown,
  Bot,
  Mail } from "lucide-react";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqCategories = [
  { id: "all", label: "All Topics" },
  { id: "account", label: "Account & Profile" },
  { id: "ai", label: "Mingalar AI Assistant" },
  { id: "jobs", label: "Jobs & Applications" },
  { id: "housing", label: "Housing & Rooms" },
  { id: "visa", label: "Visa & Legal Help" },
];

const faqs = [
  {
    category: "ai",
    question: "Is Mingalar AI free to use?",
    answer:
      "Guests can ask up to 3 free questions to test out the AI. Once you create a free member account, you unlock unlimited AI chats for job matching, visa guidance, and document translation." },
  {
    category: "account",
    question: "How do I create a free account on Mingalar Bangkok?",
    answer:
      "Click the 'Register' button in the top right corner. You can quickly sign up using your email address or phone number in less than 1 minute." },
  {
    category: "visa",
    question: "Can Mingalar AI help me extend my 90-day report or work permit?",
    answer:
      "Yes! Mingalar AI provides step-by-step guidance on 90-day online report procedures, document checklists, and renewal deadlines tailored to Thai immigration rules." },
  {
    category: "jobs",
    question: "Are job listings on Mingalar Bangkok verified?",
    answer:
      "We screen job postings to ensure legitimate employment opportunities. Look for the 'Verified' badge on job cards for vetted workplaces." },
  {
    category: "housing",
    question: "How can I contact property owners or landlords?",
    answer:
      "To contact landlords directly or view complete phone numbers/LINE IDs, please sign in or create a free member account." },
  {
    category: "account",
    question: "How do I reset my account password?",
    answer:
      "Go to the Login page and click 'Forgot Password'. Enter your registered email address to receive a secure password reset link." },
];

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <HelpCircle className="h-3.5 w-3.5" /> Support Center
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              How Can We Help You?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Search our help center or browse frequently asked questions below.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search help articles, visa questions, account help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-border/80 pl-10 text-xs sm:text-sm bg-card"
              />
            </div>
          </div>

          {/* Topic Category Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/80 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Main FAQ Accordion Section */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border/80 bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-foreground text-sm hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-border/80 bg-card p-12 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-base font-bold text-foreground">
                No matching answers found
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Try searching with different keywords or ask our AI assistant directly.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-primary/20 bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Ask Mingalar AI</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Get instant answers to visa, translation, job, and housing questions 24/7.
              </p>
            </div>
            <Link href="/ai" className="mt-4">
              <Button size="sm" className="w-full rounded-xl text-xs font-semibold">
                Chat with AI Assistant
              </Button>
            </Link>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Contact Support Team</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Need specialized assistance? Send a message to our support team.
              </p>
            </div>
            <Link href="/contact" className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl text-xs font-semibold"
              >
                Send a Message
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
