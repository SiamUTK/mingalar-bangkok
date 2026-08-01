import Link from "next/link";
import { ArrowLeft, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-4">
          <Bot className="h-8 w-8" />
        </div>
        <span className="text-4xl font-black text-primary">404</span>
        <h1 className="mt-2 text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Sorry, the page you are looking for doesn't exist or has been moved. Ask Mingalar AI or return home.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/">
            <Button size="sm" className="rounded-xl text-xs font-semibold">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Home
            </Button>
          </Link>
          <Link href="/ai">
            <Button variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
