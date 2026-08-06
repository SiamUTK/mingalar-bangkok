"use client";

import * as React from "react";
import { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export type LanguageCode = "en" | "my" | "th";

export interface LanguageSwitcherProps {
  variant?: "dropdown" | "mobile" | "inline";
  value?: LanguageCode;
  onChange?: (language: LanguageCode) => void;
  className?: string;
}

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "my", label: "မြန်မာ" },
  { code: "th", label: "ไทย" },
];

export function LanguageSwitcher({
  variant = "dropdown",
  value = "en",
  onChange,
  className,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (language: LanguageCode) => {
    onChange?.(language);
    setOpen(false);
  };

  if (variant === "inline") {
    return (
      <div
        className={cn("flex flex-wrap items-center gap-2 text-sm text-muted-foreground", className)}
      >
        {languages.map((language, index) => (
          <div key={language.code} className="flex items-center">
            <button
              type="button"
              onClick={() => handleChange(language.code)}
              className={cn(
                "transition-colors hover:text-primary cursor-pointer",
                value === language.code && "font-semibold text-primary"
              )}
            >
              {language.label}
            </button>
            {index < languages.length - 1 && <span className="mx-2 text-border">|</span>}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={cn("space-y-2", className)}>
        <div
          className="flex items-center gap-2 text-sm font-medium"
          aria-label="Language selection"
        >
          <Globe className="h-4 w-4" />
          Language
        </div>

        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleChange(language.code)}
              aria-pressed={value === language.code}
              className={cn(
                "flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                value === language.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              {language.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 text-sm font-medium text-foreground shadow-xs backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-primary/5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span>{languages.find((language) => language.code === value)?.label ?? "English"}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <>
          {/* Backdrop for closing popover */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-border bg-card p-2 shadow-2xl backdrop-blur-xl">
            <div className="space-y-1">
              {languages.map((language) => {
                const selected = value === language.code;

                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleChange(language.code)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-left transition-colors cursor-pointer",
                      selected
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span>{language.label}</span>
                    {selected && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
