"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  Bookmark,
  FileCheck,
  Bot,
  LogOut,
  Briefcase,
  Building2,
  ShieldCheck,
  Plane,
  Banknote,
  Store,
  Calendar,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

// กลุ่มเมนูการจัดการบัญชีผู้ใช้
const userNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "My Applications", icon: FileCheck },
  { href: "/saved", label: "Saved Items", icon: Bookmark },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

// กลุ่มเมนูบริการทั้งหมด (Explore All Services)
const serviceNavItems = [
  { href: "/jobs", label: "Jobs & Careers", icon: Briefcase, color: "text-blue-500" },
  { href: "/housing", label: "Housing & Rooms", icon: Building2, color: "text-emerald-500" },
  { href: "/visa", label: "Visa & Legal Help", icon: ShieldCheck, color: "text-amber-500" },
  { href: "/travel", label: "Travel & Flights", icon: Plane, color: "text-sky-500" },
  { href: "/money", label: "Money Services", icon: Banknote, color: "text-rose-500" },
  { href: "/directory", label: "Local Businesses", icon: Store, color: "text-purple-500" },
  { href: "/events", label: "Community Events", icon: Calendar, color: "text-indigo-500" },
  { href: "/ai", label: "Ask Mingalar AI", icon: Bot, color: "text-primary" },
];

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ฟังก์ชัน Log Out
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      } else {
        router.push("/login");
      }
    } catch {
      toast.error("Logout failed, redirecting...");
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border/80 bg-background px-4 shadow-xs">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image
            src="/logo/logo-dashboard.svg"
            alt="Mingalar Bangkok"
            width={200}
            height={60}
            priority
            className="h-11 w-auto"
          />

          <span className="text-lg font-black tracking-tight text-foreground whitespace-nowrap">
            Mingalar <span className="text-[#aa2429]">Bangkok</span>
          </span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border/80 bg-card p-4 transition-transform duration-300 md:static md:translate-x-0 flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo Section */}
          <div className="hidden md:flex items-center px-2 py-1">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <Image
                src="/logo/logo-dashboard.svg"
                alt="Mingalar Bangkok"
                width={200}
                height={60}
                priority
                className="h-11 w-auto"
              />

              <span className="text-lg font-black tracking-tight text-foreground whitespace-nowrap">
                Mingalar <span className="text-[#aa2429]">Bangkok</span>
              </span>
            </Link>
          </div>

          {/* Account Overview Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Account Overview
            </p>
            {userNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* All Services Navigation */}
          <div className="space-y-1 pt-2 border-t border-border/60">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              All Services
            </p>
            {serviceNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${item.color}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer: Log Out & Return to Main Web */}
        <div className="pt-4 border-t border-border/60 space-y-2">
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="outline"
            size="sm"
            className="w-full justify-start rounded-2xl text-xs font-bold text-rose-500 border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </Button>

          <Link href="/" className="block">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start rounded-2xl text-xs font-semibold text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Main Web
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Protected Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
