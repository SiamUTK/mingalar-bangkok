"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

export interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
}

export function NewsCard({ id, title, summary, date, category, image }: NewsCardProps) {
  return (
    <Link href={`/news/${id}`}>
      <article className="group overflow-hidden rounded-3xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur">
            {category}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="h-3 w-3 text-primary" />
              {date}
            </span>

            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Read
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{summary}</p>
        </div>
      </article>
    </Link>
  );
}

