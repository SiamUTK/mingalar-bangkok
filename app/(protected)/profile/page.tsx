"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Globe,
  Save,
  Sparkles,
  CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Aung Kyaw",
    email: "aung.kyaw@example.com",
    phone: "+66 81 234 5678",
    preferredLanguage: "Burmese",
    passportNumber: "M-1234567",
    passportExpiry: "2027-05-15",
    workPermitNumber: "WP-98765432",
    next90DayReport: "2026-09-12" });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!", {
        description: "Your personal details and document reminder dates have been saved." });
    }, 800);
  };

  return (
    <AnimatedPage>
      <main className="mx-auto max-w-5xl p-6 md:p-10 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-2xl font-black text-primary-foreground shadow-md">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-foreground">{profile.fullName}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" /> Verified Member
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage your profile, preferred language, and visa reminder details.
              </p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-2xl text-xs font-bold px-5 shadow-md shadow-primary/20 shrink-0"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <form onSubmit={handleSave} className="grid gap-8 md:grid-cols-12">
          {/* Left Column: Personal Information */}
          <div className="md:col-span-6 space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground border-b border-border/40 pb-3">
                <User className="h-4 w-4 text-primary" /> Personal Details
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Full Name</label>
                <div className="relative">
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="rounded-xl border-border/80 text-xs pl-9"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="rounded-xl border-border/80 text-xs pl-9"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Phone Number (Thai)</label>
                <div className="relative">
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="rounded-xl border-border/80 text-xs pl-9"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Preferred AI Language
                </label>
                <div className="relative">
                  <select
                    value={profile.preferredLanguage}
                    onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                    className="flex h-9 w-full rounded-xl border border-border/80 bg-background px-9 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <option value="Burmese">Burmese (မြန်မာ)</option>
                    <option value="Thai">Thai (ไทย)</option>
                    <option value="English">English</option>
                  </select>
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visa & Document Tracking */}
          <div className="md:col-span-6 space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-amber-500" /> Documents & Visa Tracking
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Auto Reminder Active
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Passport Number</label>
                <Input
                  value={profile.passportNumber}
                  onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value })}
                  className="rounded-xl border-border/80 text-xs"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Passport Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={profile.passportExpiry}
                    onChange={(e) => setProfile({ ...profile, passportExpiry: e.target.value })}
                    className="rounded-xl border-border/80 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Next 90-Day Report
                  </label>
                  <Input
                    type="date"
                    value={profile.next90DayReport}
                    onChange={(e) => setProfile({ ...profile, next90DayReport: e.target.value })}
                    className="rounded-xl border-border/80 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  MOU Work Permit Number
                </label>
                <Input
                  value={profile.workPermitNumber}
                  onChange={(e) => setProfile({ ...profile, workPermitNumber: e.target.value })}
                  className="rounded-xl border-border/80 text-xs"
                />
              </div>

              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3 text-[11px] text-amber-700 leading-relaxed flex items-start gap-2">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Mingalar AI automatically sends SMS/LINE reminders 14 days before your 90-day
                  report and passport expiry dates.
                </span>
              </div>
            </div>
          </div>
        </form>
      </main>
    </AnimatedPage>
  );
}
