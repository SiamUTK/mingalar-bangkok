"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-3xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
        No images available
      </div>
    );
  }

  const previous = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
          <Image
            src={images[selectedIndex]}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4"
            onClick={() => setLightboxOpen(true)}
          >
            <Expand className="h-4 w-4" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={previous}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={next}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                  selectedIndex === index ? "border-primary ring-2 ring-primary" : "border-border"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute right-6 top-6"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="relative h-full w-full max-w-6xl">
            <Image
              src={images[selectedIndex]}
              alt={title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

