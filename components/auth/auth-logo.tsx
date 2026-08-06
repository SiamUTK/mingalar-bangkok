import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AuthLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: "sm" | "md" | "lg";
}

export function AuthLogo({ size = "md", className, ...props }: AuthLogoProps) {
  const sizes = {
    sm: {
      icon: "h-10 w-10",
      title: "text-xl",
      subtitle: "text-xs",
    },
    md: {
      icon: "h-12 w-12",
      title: "text-2xl",
      subtitle: "text-sm",
    },
    lg: {
      icon: "h-16 w-16",
      title: "text-3xl",
      subtitle: "text-base",
    },
  };

  const current = sizes[size];

  return (
    <Link
      href="/"
      className={cn(
        "flex flex-col items-center gap-4 transition-opacity hover:opacity-90",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg",
          current.icon
        )}
      >
        MB
      </div>

      <div className="text-center">
        <h2 className={cn("font-bold tracking-tight", current.title)}>Mingalar Bangkok</h2>

        <p className={cn("text-muted-foreground", current.subtitle)}>
          AI Platform for Myanmar Community
        </p>
      </div>
    </Link>
  );
}
