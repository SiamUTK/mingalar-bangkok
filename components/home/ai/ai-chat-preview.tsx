"use client";

import { Bot, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";

const conversation = [
  {
    role: "user",
    message: "Find me a Myanmar restaurant near BTS Asok.",
  },
  {
    role: "assistant",
    message:
      "I found several highly rated Myanmar restaurants near Asok. Would you like the closest, the highest rated, or the most affordable?",
  },
  {
    role: "user",
    message: "Also recommend nearby apartments under ฿8,000.",
  },
];

const suggestions = [
  "Find jobs in Bangkok",
  "Cheap apartments",
  "Translate Myanmar to Thai",
  "Travel to Chiang Mai",
];

export function AIChatPreview() {
  return (
    <div className="overflow-hidden rounded-4xl border border-border bg-background shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold">Mingalar AI</h3>

            <p className="text-sm text-muted-foreground">Online • AI Assistant</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          GPT Powered
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-6 p-6">
        {conversation.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`flex max-w-[85%] gap-3 ${
                item.role === "assistant" ? "" : "flex-row-reverse"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                  item.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {item.role === "assistant" ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>

              <div
                className={`rounded-3xl px-5 py-4 text-sm leading-7 ${
                  item.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {item.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="border-t bg-muted/30 p-6">
        <p className="mb-4 text-sm font-medium">Try asking...</p>

        <div className="flex flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm transition hover:border-primary hover:bg-primary/5"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <Button className="mt-6 w-full" size="lg">
          Start Chat with Mingalar AI
        </Button>
      </div>
    </div>
  );
}
