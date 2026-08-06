"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Sparkles, X, Send, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const defaultPrompts = [
  "💼 Factory jobs in Samut Sakhon",
  "🏠 Rooms under ฿3,000",
  "🛂 How to renew visa?",
  "🍜 Myanmar food near BTS",
];

export function StickyAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! Mingalarbar 🙏 How can I help you live, work, or travel in Thailand today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [guestQuestionCount, setGuestQuestionCount] = useState(0);

  // สมมติสถานะการล็อกอิน (ในอนาคตดึงจาก Auth Context)
  const isAuthenticated = false;
  const maxFreeQuestions = 3;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    if (!isAuthenticated && guestQuestionCount >= maxFreeQuestions) {
      toast("Guest Limit Reached", {
        description:
          "You have used your 3 free AI questions. Please sign in or register to continue unlimited chats.",
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
      return;
    }

    // เพิ่มข้อความของผู้ใช้
    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInput("");

    if (!isAuthenticated) {
      setGuestQuestionCount((prev) => prev + 1);
    }

    // จำลองคำตอบจาก AI
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I found results regarding "${query}". Create a free account to unlock detailed AI recommendations and saved history!`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. Slide-up Chat Popover Panel */}
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border/80 bg-background shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Mingalar AI</h4>
                <p className="text-[11px] text-muted-foreground">Always here to help</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isAuthenticated && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                  <Sparkles className="h-3 w-3" />
                  {maxFreeQuestions - guestQuestionCount} Free Left
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="max-h-[300px] min-h-[220px] overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-muted text-foreground border border-border/50"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Locked Warning Banner for Guest when limit reached */}
            {!isAuthenticated && guestQuestionCount >= maxFreeQuestions && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-amber-600 font-bold text-xs">
                  <Lock className="h-3.5 w-3.5" />
                  Guest Question Limit Reached
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Sign up for a free account to continue chatting with Mingalar AI continuously!
                </p>
                <Link href="/register" className="block">
                  <Button size="sm" className="w-full rounded-xl font-bold">
                    Create Free Account
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Suggested Prompts (If under limit) */}
          {!isAuthenticated && guestQuestionCount < maxFreeQuestions && (
            <div className="border-t border-border/40 bg-muted/20 px-3 py-2 flex flex-wrap gap-1.5">
              {defaultPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-muted-foreground hover:border-primary hover:text-foreground transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="border-t border-border/60 p-3 bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder={
                  !isAuthenticated && guestQuestionCount >= maxFreeQuestions
                    ? "Limit reached. Register to continue..."
                    : "Ask AI anything..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!isAuthenticated && guestQuestionCount >= maxFreeQuestions}
                className="h-9 text-xs rounded-xl border-border/80"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!isAuthenticated && guestQuestionCount >= maxFreeQuestions}
                className="h-9 w-9 p-0 rounded-xl shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 hover:scale-110 focus:outline-none"
        aria-label="Open AI Assistant"
      >
        {/* Glow & Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25 pointer-events-none" />

        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <Bot className="h-7 w-7 transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black border-2 border-background">
              AI
            </span>
          </>
        )}
      </button>
    </div>
  );
}
