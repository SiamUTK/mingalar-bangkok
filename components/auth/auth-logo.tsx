import Link from "next/link";

interface AuthLogoProps {
  size?: "sm" | "md" | "lg";
}

export function AuthLogo({ size = "md" }: AuthLogoProps) {
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
    <Link href="/" className="flex flex-col items-center gap-4 transition-opacity hover:opacity-90">
      <div
        className={`flex ${current.icon} items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg`}
      >
        MB
      </div>

      <div className="text-center">
        <h2 className={`${current.title} font-bold tracking-tight`}>Mingalar Bangkok</h2>

        <p className={`${current.subtitle} text-muted-foreground`}>
          AI Platform for Myanmar Community
        </p>
      </div>
    </Link>
  );
}
