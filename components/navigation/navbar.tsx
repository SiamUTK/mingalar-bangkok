"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { LayoutDashboard, LogIn, UserPlus, Bot } from "lucide-react";
import { createClient } from "@/lib/supabase/client"; // หรือ Supabase Auth Helper ในโปรเจกต์ของคุณ
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // เช็คเซสชันผู้ใช้จาก Supabase
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            M
          </span>
          <span>Mingalar BKK</span>
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

        {/* Dynamic Action Buttons */}
        <div className="flex items-center gap-3">
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
                /* 🟢 สำหรับสมาชิกที่ล็อกอินแล้ว */
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
                /* 🔴 สำหรับคนทั่วไป (Guest) */
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="rounded-2xl text-xs font-bold">
                      <LogIn className="mr-1.5 h-3.5 w-3.5" /> Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="rounded-2xl text-xs font-bold">
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

