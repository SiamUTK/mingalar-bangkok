"use client";

import Link from "next/link";
import { Bot, Sparkles, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const conversation = [
  {
    role: "user",
    message: "Find me a Myanmar restaurant near BTS Asok.",
  },
  {
    role: "assistant",
    message:
      "I found several highly rated Myanmar restaurants near Asok. Would you like the closest, highest rated, or most affordable?",
  },
  {
    role: "user",
    message: "Also recommend nearby apartments under ฿8,000.",
  },
];

const suggestions = [
  "💼 Factory jobs in Samut Sakhon",
  "🏠 Rooms under ฿3,000",
  "🛂 How to renew visa?",
  "🍜 Myanmar food nearby",
];

export function AIChatPreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-xl md:rounded-4xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
            <Bot className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-foreground">Mingalar AI</h3>
            <p className="text-xs text-muted-foreground">Online • 24/7 Smart Assistant</p>
          </div>
        </div>

        {/* Guest Limit Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />3 Free Guest Questions
        </span>
      </div>

      {/* Message History Mockup */}
      <div className="space-y-4 p-6">
        {conversation.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`flex max-w-[88%] gap-3 ${
                item.role === "assistant" ? "" : "flex-row-reverse"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                  item.role === "assistant"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              <div
                className={`rounded-2xl px-4 py-3 text-xs leading-relaxed md:text-sm ${
                  item.role === "assistant"
                    ? "bg-primary/10 text-foreground border border-primary/15"
                    : "bg-muted text-foreground"
                }`}
              >
                {item.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts & Unlimited Access Action */}
      <div className="border-t border-border/60 bg-muted/20 p-5 md:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Suggested Questions:
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Link key={suggestion} href="/ai">
              <button
                type="button"
                className="rounded-full border border-border/80 bg-background px-3.5 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
              >
                {suggestion}
              </button>
            </Link>
          ))}
        </div>

        {/* CTA to Unlock Unlimited AI */}
        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Sign in to unlock unlimited AI chats, history, and personalized recommendations.
          </p>

          <Link href="/ai" className="block mt-3">
            <Button
              className="w-full rounded-xl font-semibold shadow-md shadow-primary/20"
              size="lg"
            >
              Start Full AI Chat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

