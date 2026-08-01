'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { Button } from '@/components/ui'

export interface Image {
  id: string
  url: string
  alt: string
}

export interface ImageGalleryProps {
  images: Image[]
  onImageClick?: (imageId: string, index: number) => void
}

export function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images.length) {
    return (
      <div className="w-full h-64 md:h-96 bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Images className="h-8 w-8" />
          <span className="text-sm">No images available</span>
        </div>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = images[currentIndex]

  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-64 md:h-96 bg-muted overflow-hidden rounded-lg md:rounded-none cursor-pointer"
        onClick={() => onImageClick?.(currentImage.id, currentIndex)}
      >
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 px-4 md:px-6">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden border-2 transition-colors ${
                index === currentIndex ? 'border-primary' : 'border-border'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

