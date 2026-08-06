"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
}

export function EventCard({ id, title, date, location, category, image }: EventCardProps) {
  const router = useRouter();
  const isAuthenticated = false;

  const handleSaveEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast("Sign in to Save Events", {
        description: "Please create a free account to save upcoming events to your calendar.",
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
    }
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-border/80 bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[11px] font-bold text-primary">
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Link href={`/events/${id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-medium">
              Event Details
            </Button>
          </Link>
          <Button onClick={handleSaveEvent} size="sm" className="rounded-xl px-3">
            <Lock className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
