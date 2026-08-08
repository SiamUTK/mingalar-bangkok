// components/home/hero/hero-ai-widget.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Bot, Send, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestedQuestions = [
  "How do I renew my 90-day report?",
  "Find factory jobs near Samut Sakhon",
  "Rooms under ฿3,000 near my workplace",
];

export function HeroAIWidget() {
  const [query, setQuery] = React.useState("");
  const [questionsLeft, setQuestionsLeft] = React.useState(3);
  const [messages, setMessages] = React.useState<Array<{ role: string; text: string }>>([]);

  const handleAsk = (textToAsk?: string) => {
    const activeQuery = textToAsk || query;
    if (!activeQuery.trim() || questionsLeft <= 0) return;

    const newMsg = { role: "user", text: activeQuery };
    setMessages((prev) => [...prev, newMsg]);
    setQuery("");
    setQuestionsLeft((prev) => prev - 1);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Mingalar! Here is help regarding: "${activeQuery}". For official submission steps, our tool connects directly with Thai immigration services.`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card p-6 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2 font-bold text-sm">
          <Bot className="h-4 w-4 text-[#aa2429]" />
          <span>Try Mingalar AI Live</span>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
          ⚡ {questionsLeft} Free Questions Left
        </span>
      </div>

      {/* Message Output */}
      {messages.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto text-left text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl ${
                m.role === "user"
                  ? "bg-primary/10 text-foreground ml-auto max-w-[80%]"
                  : "bg-muted text-muted-foreground mr-auto max-w-[90%]"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
      )}

      {/* Clickable Sample Chips */}
      {questionsLeft > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleAsk(q)}
              className="rounded-full border border-border bg-muted/50 px-3 py-1 text-muted-foreground hover:border-primary hover:text-foreground transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      {questionsLeft > 0 ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask anything about living in Thailand..."
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
          />
          <Button
            size="sm"
            onClick={() => handleAsk()}
            className="rounded-2xl bg-[#aa2429] hover:bg-[#8e1e22] text-white"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        /* Registration Gate (Escaped Apostrophe Fixed Here) */
        <div className="rounded-2xl bg-primary/10 p-4 text-center space-y-2">
          <p className="text-xs font-bold">You&apos;ve used your 3 free questions!</p>
          <p className="text-xs text-muted-foreground">
            Create a free account for unlimited access.
          </p>
          <Link href="/register" className="inline-block">
            <Button size="sm" className="rounded-2xl bg-[#aa2429] hover:bg-[#8e1e22] text-white">
              <UserPlus className="mr-1.5 h-3.5 w-3.5" />
              Join Free Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
