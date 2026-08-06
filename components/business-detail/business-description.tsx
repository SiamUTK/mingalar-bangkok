'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'

export interface BusinessDescriptionProps {
  content: string
  maxLines?: number
}

export function BusinessDescription({
  content,
  maxLines = 3,
}: BusinessDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  const lines = content.split('\n').filter(line => line.trim())
  const isLong = lines.length > maxLines

  return (
    <Card>
      <CardHeader>
        <CardTitle>About This Business</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={!expanded && isLong ? 'line-clamp-3' : ''}>
          {lines.map((line, index) => (
            <p key={index} className="text-sm leading-relaxed mb-2">
              {line}
            </p>
          ))}
        </div>
        {isLong && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="mt-2"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}


