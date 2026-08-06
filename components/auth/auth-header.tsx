import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  description: string;
  showLogo?: boolean;
}

export function AuthHeader({ title, description, showLogo = true }: AuthHeaderProps) {
  return (
    <header className="space-y-6 text-center">
      {showLogo && (
        <Link href="/" className="inline-flex items-center justify-center">
          <span className="text-3xl font-bold tracking-tight">Mingalar Bangkok</span>
        </Link>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}

