'use client'

import { Star, ThumbsUp, Flag } from 'lucide-react'
import { Avatar, Badge } from '@/components/ui'
import { Button } from '@/components/ui'
import { useState } from 'react'

export interface ReviewCardProps {
  id: string
  authorName: string
  _authorAvatar?: string
  rating: number
  date: string
  title?: string
  content: string
  helpful?: number
  onHelpful?: (reviewId: string) => void
  onReport?: (reviewId: string) => void
}

export function ReviewCard({
  id,
  authorName,
  _authorAvatar,
  rating,
  date,
  title,
  content,
  helpful = 0,
  onHelpful,
  onReport,
}: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false)

  const handleHelpful = () => {
    setIsHelpful(!isHelpful)
    onHelpful?.(id)
  }

  return (
    <div className="border-b py-4 last:border-b-0">
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          alt={authorName}
          fallback={authorName.substring(0, 2).toUpperCase()}
          size="sm"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-sm">{authorName}</p>
            <Badge size="sm" variant="secondary">
              Verified Purchase
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? 'fill-secondary text-secondary'
                : 'text-border'
            }`}
          />
        ))}
      </div>

      {title && (
        <p className="font-medium text-sm mb-1">{title}</p>
      )}

      <p className="text-sm text-foreground mb-3 leading-relaxed">{content}</p>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleHelpful}
          className={isHelpful ? 'text-primary' : ''}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-xs ml-1">
            {isHelpful ? helpful + 1 : helpful} {helpful === 1 ? 'person' : 'people'} found helpful
          </span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onReport?.(id)}
        >
          <Flag className="h-4 w-4" />
          <span className="text-xs ml-1">Report</span>
        </Button>
      </div>
    </div>
  )
}


