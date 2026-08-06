"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { LayoutDashboard, Sparkles, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 🟢 Top Member Strip: แสดงเฉพาะคนที่ล็อกอินแล้วเท่านั้น */}
      {user && (
        <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-xs font-semibold text-primary">
          <div className="container mx-auto flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              Logged in as <strong className="font-bold">{user.email}</strong>
            </span>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-bold hover:underline"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Return to Dashboard <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
