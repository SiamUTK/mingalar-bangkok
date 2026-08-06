"use client";

import { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { AnimatedDropdown } from "@/components/ui/AnimatedDropdown";

type LanguageCode = "en" | "my" | "th";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "mobile" | "inline";
  value?: LanguageCode;
  onChange?: (language: LanguageCode) => void;
  className?: string;
}

const languages = [
  { code: "en" as const, label: "English" },
  { code: "my" as const, label: "မြန်မာ" },
  { code: "th" as const, label: "ไทย" },
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
                "transition-colors hover:text-primary",
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
                "flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
    <div className={cn("relative", className)}>
      <Menu.Root open={open} onOpenChange={setOpen}>
        <Menu.Trigger
          className="flex h-10 items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4" />
          <span>{languages.find((language) => language.code === value)?.label ?? "English"}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner className="z-50">
            <AnimatedDropdown
              open={open}
              className="w-44 overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-2 shadow-2xl backdrop-blur-xl"
            >
              <Menu.Popup className="space-y-1">
                {languages.map((language) => {
                  const selected = value === language.code;

                  return (
                    <Menu.Item
                      key={language.code}
                      onClick={() => handleChange(language.code)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-left transition-colors",
                        selected ? "bg-primary text-white" : "text-foreground hover:bg-primary/10"
                      )}
                    >
                      <span>{language.label}</span>
                      {selected ? <Check className="h-4 w-4" /> : null}
                    </Menu.Item>
                  );
                })}
              </Menu.Popup>
            </AnimatedDropdown>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}

