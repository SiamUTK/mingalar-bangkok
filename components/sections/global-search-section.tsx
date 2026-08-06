"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import { motion } from "framer-motion";
import { Search, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GlobalSearchSectionProps {
  onSearch?: (query: string, category: string, location: string) => void;
  categories?: Array<{ value: string; label: string }>;
  locations?: Array<{ value: string; label: string }>;
  title?: string;
  subtitle?: string;
}

const DEFAULT_CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "jobs", label: "Jobs" },
  { value: "housing", label: "Housing" },
  { value: "businesses", label: "Businesses" },
  { value: "services", label: "Services" },
  { value: "events", label: "Events" },
];

const DEFAULT_LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "bangkok", label: "Bangkok" },
  { value: "chiang-mai", label: "Chiang Mai" },
  { value: "phuket", label: "Phuket" },
  { value: "pattaya", label: "Pattaya" },
  { value: "chiang-rai", label: "Chiang Rai" },
];

export function GlobalSearchSection({
  onSearch = () => {},
  categories = DEFAULT_CATEGORIES,
  locations = DEFAULT_LOCATIONS,
  title = "Find What You Need",
  subtitle = "Search jobs, housing, businesses, and community events",
}: GlobalSearchSectionProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category, location);
  };

  const handleSearchClick = () => {
    onSearch(query, category, location);
  };

  return (
    <section className="w-full py-16 md:py-20 bg-secondary/3">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Search Bar */}
          <div className="mb-6 bg-white rounded-2xl shadow-lg p-2 md:p-3 border border-border hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              {/* Search Input */}
              <div className="flex-1 flex items-center px-4 py-2 rounded-xl bg-background">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search keywords, jobs, or businesses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 ml-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Category Select */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-xl bg-background text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {/* Location Select */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-2 rounded-xl bg-background text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>

              {/* Microphone Button */}
              <button
                type="button"
                className="p-2 rounded-xl bg-background hover:bg-secondary/10 transition-colors text-muted-foreground hover:text-primary flex items-center justify-center"
                title="Voice search (coming soon)"
              >
                <Mic className="h-5 w-5" />
              </button>

              {/* Search Button */}
              <Button
                type="submit"
                size="lg"
                onClick={handleSearchClick}
                className="rounded-xl px-6 md:px-8 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>

            {/* AI Badge */}
            <div className="mt-3 flex items-center gap-2 px-4">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-xs font-semibold text-secondary">AI-Powered Search</span>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "IT Jobs Bangkok",
                "House Rent",
                "Myanmar Restaurant",
                "Thai Language Class",
                "Community Events",
              ].map((tag, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:bg-secondary/10 hover:border-secondary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.form>
      </Container>
    </section>
  );
}

