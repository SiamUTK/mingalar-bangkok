import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <Card className={`w-full max-w-md border-slate-200 shadow-xl ${className}`}>
      <CardContent className="p-8">{children}</CardContent>
    </Card>
  );
}
