"use client";

interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label = "or" }: AuthDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-background px-4 text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
