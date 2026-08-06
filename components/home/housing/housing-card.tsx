"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bath, BedDouble, Heart, Lock, MapPin, Ruler } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export interface HousingProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured?: boolean;
}

export function HousingCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  featured = false,
}: HousingProperty) {
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  // TODO: Replace with actual authentication state
  const isAuthenticated = false;

  const handleSaveProperty = () => {
    if (!isAuthenticated) {
      toast("Sign in to Save Housing", {
        description: "Create a free account to save rooms and compare listings later.",
        action: {
          label: "Create Account",
          onClick: () => router.push("/register"),
        },
      });
      return;
    }

    setIsSaved((prev) => !prev);

    toast.success(isSaved ? "Removed from saved housing." : "Property saved!");
  };

  const handleContactOwner = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAuthenticated) return;

    e.preventDefault();

    toast("Sign in to Contact Owner", {
      description: "Please log in to view direct phone numbers and Line IDs of property owners.",
      action: {
        label: "Sign In",
        onClick: () => router.push("/login"),
      },
    });
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl md:rounded-4xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {featured && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
            Featured
          </span>
        )}

        <button
          type="button"
          onClick={handleSaveProperty}
          aria-label="Save property"
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-transform hover:scale-110 ${
            isSaved ? "bg-rose-500 text-white" : "bg-white/90 text-foreground"
          }`}
        >
          <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span>{location}</span>
          </div>
        </div>

        <div className="text-2xl font-black text-primary">{price}</div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-muted/60 p-3">
          <div className="text-center">
            <BedDouble className="mx-auto h-4 w-4 text-primary" />
            <div className="mt-1 text-xs font-medium">{bedrooms} Bed</div>
          </div>

          <div className="text-center">
            <Bath className="mx-auto h-4 w-4 text-primary" />
            <div className="mt-1 text-xs font-medium">{bathrooms} Bath</div>
          </div>

          <div className="text-center">
            <Ruler className="mx-auto h-4 w-4 text-primary" />
            <div className="mt-1 text-xs font-medium">{area}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link href={`/housing/${id}`}>
            <Button variant="outline" className="w-full rounded-2xl text-xs font-medium">
              View Details
            </Button>
          </Link>

          <Link href={`/housing/${id}`} onClick={handleContactOwner}>
            <Button className="w-full rounded-2xl text-xs font-semibold shadow-md shadow-primary/20">
              <Lock className="mr-1 h-3.5 w-3.5" />
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
