"use client";

import { useState } from "react";
import {
  Bell,
  Shield,
  Smartphone,
  Save,
  KeyRound,
  Eye,
  EyeOff } from "lucide-react";
import { toast } from "sonner";

import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Settings State
  const [notifications, setNotifications] = useState({
    visaAlerts: true,
    exchangeRateAlerts: true,
    jobAlerts: false,
    lineNotify: true,
    smsNotify: true });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "" });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!", {
        description: "Your notification and account preferences have been updated." });
    }, 800);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Please fill in required password fields.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    toast.success("Password updated!", {
      description: "Your account password has been changed successfully." });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <AnimatedPage>
      <main className="mx-auto max-w-5xl p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground">Account Settings</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your security, notification alerts, and application preferences.
            </p>
          </div>

          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="rounded-2xl text-xs font-bold px-5 shadow-md shadow-primary/20 shrink-0"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Left Column: Notification & Alert Preferences */}
          <div className="md:col-span-6 space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground border-b border-border/40 pb-3">
                <Bell className="h-4 w-4 text-primary" /> Automated Notifications
              </div>

              {/* Visa & Expiry Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">90-Day & Visa Expiry Alerts</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Get reminded 14 days before your 90-day report or visa expiration date.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.visaAlerts}
                  onChange={(e) =>
                    setNotifications({ ...notifications, visaAlerts: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </div>

              {/* Exchange Rate Alerts */}
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <h4 className="text-xs font-bold text-foreground">Daily THB/MMK Rate Alerts</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Receive daily updates on exchange rates and remittance deals.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.exchangeRateAlerts}
                  onChange={(e) =>
                    setNotifications({ ...notifications, exchangeRateAlerts: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </div>

              {/* Job Alerts */}
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <h4 className="text-xs font-bold text-foreground">New Matching Job Postings</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Get notified when new jobs matching your profile are published.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.jobAlerts}
                  onChange={(e) =>
                    setNotifications({ ...notifications, jobAlerts: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Delivery Channels */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground border-b border-border/40 pb-3">
                <Smartphone className="h-4 w-4 text-emerald-500" /> Notification Channels
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">LINE Official Notifications</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Receive instant alerts on LINE.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.lineNotify}
                  onChange={(e) =>
                    setNotifications({ ...notifications, lineNotify: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <h4 className="text-xs font-bold text-foreground">SMS Direct Alerts</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Receive urgent SMS reminders on your Thai number.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.smsNotify}
                  onChange={(e) =>
                    setNotifications({ ...notifications, smsNotify: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Security & Password */}
          <div className="md:col-span-6 space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground border-b border-border/40 pb-3">
                <KeyRound className="h-4 w-4 text-amber-500" /> Password & Security
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      className="rounded-xl border-border/80 text-xs pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">New Password</label>
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="rounded-xl border-border/80 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Repeat new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="rounded-xl border-border/80 text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  className="w-full rounded-2xl text-xs font-bold py-2"
                >
                  Update Password
                </Button>
              </form>
            </div>

            {/* Account Privacy Card */}
            <div className="rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-6 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Shield className="h-4 w-4" /> Data Protection Guarantee
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your passport numbers and personal information are encrypted according to PDPA
                compliance and never shared with unverified third parties.
              </p>
            </div>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
