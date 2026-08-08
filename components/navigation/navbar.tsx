// components/navigation/navbar.tsx
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogIn, UserPlus, Bot, Globe, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export interface NavItem {
  label: string;
  href: string;
}

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "my", label: "မြန်မာ", flag: "🇲🇲" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
];

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Mingalar Bangkok home">
          <Image
            src="/logo/logo-navbar.svg"
            alt="Mingalar Bangkok"
            width={140}
            height={42}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Public Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Find Jobs
          </Link>
          <Link href="/housing" className="hover:text-primary transition-colors">
            Housing
          </Link>
          <Link href="/visa" className="hover:text-primary transition-colors">
            Visa Help
          </Link>
          <Link href="/travel" className="hover:text-primary transition-colors">
            Travel
          </Link>
          <Link href="/directory" className="hover:text-primary transition-colors">
            Directory
          </Link>
        </nav>

        {/* Dynamic Action Buttons & Language Dropdown */}
        <div className="flex items-center gap-3">
          {/* Language Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 rounded-2xl border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:border-primary/50 transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span>{selectedLang.flag}</span>
              <span>{selectedLang.label}</span>
              <ChevronDown
                className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu Options */}
            {isLangOpen && (
              <div
                className="absolute right-0 mt-2 w-36 rounded-2xl border border-border bg-card p-1 shadow-xl z-50 backdrop-blur-md"
                onMouseLeave={() => setIsLangOpen(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                      selectedLang.code === lang.code
                        ? "bg-primary/10 text-primary font-bold"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/ai">
            <Button
              size="sm"
              variant="outline"
              className="rounded-2xl text-xs font-bold gap-1.5 hidden sm:flex"
            >
              <Bot className="h-3.5 w-3.5 text-primary" />
              Ask AI
            </Button>
          </Link>

          {!loading && (
            <>
              {user ? (
                /* Member logged in */
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="rounded-2xl text-xs font-bold gap-1.5 shadow-md shadow-primary/20"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    My Dashboard
                  </Button>
                </Link>
              ) : (
                /* Guest */
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="rounded-2xl text-xs font-bold">
                      <LogIn className="mr-1.5 h-3.5 w-3.5" /> Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="rounded-2xl text-xs font-bold bg-[#aa2429] hover:bg-[#8e1e22] text-white"
                    >
                      <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Register
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
