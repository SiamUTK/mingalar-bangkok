"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Briefcase,
  FileText,
  Lock,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedPrompts = [
  {
    icon: Briefcase,
    category: "Jobs",
    question: "Find factory jobs near Samut Sakhon with accommodation included",
  },
  {
    icon: FileText,
    category: "Visa",
    question: "How do I extend my 90-day report online in Thailand?",
  },
  {
    icon: Building2,
    category: "Housing",
    question: "Show me budget apartments under ฿4,000 near BTS Sukhumvit line",
  },
  {
    icon: Bot,
    category: "Translation",
    question: "Translate 'Where is the immigration office?' into polite Thai",
  },
];

export default function AIPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Mingalarbar! 🙏 I am Mingalar AI. Ask me anything about finding jobs, housing, visa procedures, or living in Thailand!",
    },
  ]);
  const [input, setInput] = useState("");
  const [guestQuestionCount, setGuestQuestionCount] = useState(0);

  // สมมติสถานะสำหรับ Guest
  const isAuthenticated = false;
  const maxFreeQuestions = 3;

  const handleSend = (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim()) return;

    if (!isAuthenticated && guestQuestionCount >= maxFreeQuestions) {
      toast("Guest Free Limit Reached", {
        description:
          "You've used all 3 free questions! Create a free account to unlock unlimited AI chats.",
        action: {
          label: "Create Free Account",
          onClick: () => router.push("/register"),
        },
      });
      return;
    }

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");

    if (!isAuthenticated) {
      setGuestQuestionCount((prev) => prev + 1);
    }

    // Simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Here is information regarding: "${text}". To get full step-by-step guidance and saved chat history, please create a free account!`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner Header */}
      <AnimatedSection className="border-b border-border/60 bg-linear-to-b from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Community Assistant
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground md:text-5xl">
            Ask{" "}
            <span className="bg-linear-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Mingalar AI
            </span>{" "}
            Anything
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Get instant answers for living, working, housing, and legal rules in Thailand in
            Burmese, Thai, and English.
          </p>

          {!isAuthenticated && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1 text-xs font-bold text-amber-600 border border-amber-500/20">
              <Zap className="h-3.5 w-3.5" />
              Guest Questions Remaining: {maxFreeQuestions - guestQuestionCount} /{" "}
              {maxFreeQuestions}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Main Interactive Chat Area */}
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden">
          {/* Chat Messages Body */}
          <div className="min-h-[380px] max-h-125 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex gap-3 max-w-[85%]">
                  {msg.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-muted text-foreground border border-border/50"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Limit Warning for Guests */}
            {!isAuthenticated && guestQuestionCount >= maxFreeQuestions && (
              <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-amber-600 font-bold text-sm">
                  <Lock className="h-4 w-4" />
                  Free Guest Questions Reached
                </div>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Create your free account today to get unlimited AI assistance, save chat
                  histories, and receive personalized alerts!
                </p>
                <Link href="/register" className="inline-block">
                  <Button
                    size="default"
                    className="rounded-2xl font-bold shadow-md shadow-primary/20 px-6"
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Suggested Starter Questions */}
          {!isAuthenticated && guestQuestionCount < maxFreeQuestions && (
            <div className="border-t border-border/40 bg-muted/20 p-4">
              <p className="text-[11px] font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <Brain className="h-3.5 w-3.5 text-primary" /> Try asking one of these:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestedPrompts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => handleSend(item.question)}
                      className="flex items-start gap-2.5 rounded-2xl border border-border/80 bg-background p-3 text-left transition hover:border-primary/50 hover:bg-card"
                    >
                      <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground font-medium line-clamp-1">
                        {item.question}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="border-t border-border/60 p-4 bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder={
                  !isAuthenticated && guestQuestionCount >= maxFreeQuestions
                    ? "Limit reached. Register for free to continue..."
                    : "Ask about visa, jobs, housing, or translation..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!isAuthenticated && guestQuestionCount >= maxFreeQuestions}
                className="h-11 rounded-2xl border-border/80 text-xs md:text-sm"
              />
              <Button
                type="submit"
                disabled={!isAuthenticated && guestQuestionCount >= maxFreeQuestions}
                className="h-11 rounded-2xl px-5 shrink-0 font-semibold"
              >
                <Send className="h-4 w-4 md:mr-1.5" />
                <span className="hidden md:inline">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
