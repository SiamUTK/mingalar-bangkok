"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  TrendingUp,
  ArrowRightLeft,
  ShieldCheck,
  Bell,
  Sparkles,
  Lock,
  Info,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockRates = {
  thbToMmk: 118.5, // 1 THB = 118.5 MMK (example rate)
  lastUpdated: "Today, 10:30 AM (ICT)",
};

const remittanceProviders = [
  {
    id: "1",
    name: "TrueMoney Transfer",
    type: "Digital Wallet / Counter",
    rate: "1 THB = 118.2 MMK",
    fee: "Free for first 2 transactions",
    deliveryTime: "Instant - 10 Mins",
    recommended: true,
  },
  {
    id: "2",
    name: "KBank & KBZ Express",
    type: "Bank Transfer",
    rate: "1 THB = 118.5 MMK",
    fee: "฿100 flat fee",
    deliveryTime: "Same Day",
    recommended: true,
  },
  {
    id: "3",
    name: "DeeMoney Remit",
    type: "Mobile App",
    rate: "1 THB = 118.0 MMK",
    fee: "฿150 flat fee",
    deliveryTime: "Within 24 Hours",
    recommended: false,
  },
];

export default function MoneyPage() {
  const [amountThb, setAmountThb] = useState<number | "">(1000);
  const router = useRouter();
  const isAuthenticated = false; // guest status simulation

  const calculatedMmk =
    typeof amountThb === "number" && !isNaN(amountThb)
      ? (amountThb * mockRates.thbToMmk).toLocaleString()
      : "0";

  const handleLockedAction = (actionName: string) => {
    if (!isAuthenticated) {
      toast(`Sign in to ${actionName}`, {
        description: `Please create a free account to ${actionName.toLowerCase()} and receive daily exchange rate SMS/LINE alerts.`,
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
    }
  };

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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
              <Banknote className="h-3.5 w-3.5" /> Remittance & Exchange Rates
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Exchange Rates & Money Transfers
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Calculate daily THB to MMK exchange rates and compare trusted remittance providers
              safely.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Exchange Rate Calculator */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">THB / MMK Calculator</h2>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Updated {mockRates.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>

              {/* Calculator Inputs */}
              <div className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    You Send (THB - Thai Baht)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={amountThb}
                      onChange={(e) =>
                        setAmountThb(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      placeholder="1,000"
                      className="h-12 rounded-2xl border-border/80 text-sm font-bold pr-16 bg-muted/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                      THB 🇹🇭
                    </span>
                  </div>
                </div>

                <div className="flex justify-center py-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ArrowRightLeft className="h-4 w-4 rotate-90" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Recipient Gets (Estimated MMK)
                  </label>
                  <div className="relative">
                    <div className="flex h-12 w-full items-center rounded-2xl border border-border/80 bg-emerald-500/5 px-4 text-base font-black text-emerald-600">
                      {calculatedMmk}
                    </div>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600">
                      MMK 🇲🇲
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/40 p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>
                    Calculated at current estimated market rate (1 THB ≈ {mockRates.thbToMmk} MMK).
                    Actual provider rates may vary slightly.
                  </span>
                </div>

                {/* Rate Alert Button */}
                <Button
                  onClick={() => handleLockedAction("Set Exchange Rate Alert")}
                  className="w-full rounded-2xl font-bold py-2.5 text-xs shadow-md shadow-primary/20 mt-2"
                >
                  <Bell className="mr-1.5 h-4 w-4" /> Set Daily Rate Alert (Free)
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Remittance Providers List */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Trusted Remittance Services</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Compare verified money transfer options for sending funds to family in Myanmar.
              </p>
            </div>

            <div className="space-y-4">
              {remittanceProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="group rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground text-base group-hover:text-emerald-600 transition-colors">
                          {provider.name}
                        </h3>
                        {provider.recommended && (
                          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{provider.type}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => handleLockedAction("Compare Transfer Rates")}
                        size="sm"
                        className="rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                        Check Transfer Steps
                      </Button>
                      <Button
                        onClick={() => handleLockedAction("Save Remittance Info")}
                        variant="outline"
                        size="sm"
                        className="rounded-xl px-3"
                      >
                        <Lock className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/40 pt-3 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Exchange Rate</span>
                      <span className="font-bold text-foreground">{provider.rate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Transfer Fee</span>
                      <span className="font-bold text-foreground">{provider.fee}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Delivery Time</span>
                      <span className="font-bold text-foreground">{provider.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Member Banner */}
            <div className="rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-6 text-center shadow-lg">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md mb-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Get Instant Rate Notifications on LINE / SMS
              </h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                Create a free account to receive automated daily exchange rate updates directly to
                your phone.
              </p>
              <div className="mt-4">
                <Link href="/register">
                  <Button size="sm" className="rounded-xl font-bold shadow-md shadow-primary/20">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
