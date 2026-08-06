"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({
  title,
  description,
  children,
  footer,
  className,
  ...props
}: AuthLayoutProps) {
  return (
    <main className={cn("min-h-screen bg-slate-50", className)} {...props}>
      <Container className="flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="space-y-8 p-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>

              <p className="text-sm text-slate-600">{description}</p>
            </div>

            <div>{children}</div>

            {footer && (
              <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
                {footer}
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
