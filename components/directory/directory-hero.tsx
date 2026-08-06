"use client";

import { Search } from "lucide-react";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui/button-variants";
import { Input } from "@/components/ui";

interface DirectoryHeroProps {
  title?: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export function DirectoryHero({
  title = "Myanmar Business Directory",
  subtitle = "Find trusted businesses, services, and professionals in Bangkok",
  onSearch,
  searchPlaceholder = "Search businesses, services...",
}: DirectoryHeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch?.(query);
  };

  return (
    <section className="bg-linear-to-b from-primary/5 to-transparent py-12 md:py-16">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>

          <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-2xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  name="search"
                  placeholder={searchPlaceholder}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              <Button type="submit" icon={<Search className="h-4 w-4" />}>
                Search
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
