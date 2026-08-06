import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AuthCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className, ...props }: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-md border-slate-200 shadow-xl", className)} {...props}>
      <CardContent className="p-8">{children}</CardContent>
    </Card>
  );
}
