'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Mail, Globe, Share2 } from 'lucide-react'

export interface BusinessInformationProps {
  description?: string
  website?: string
  email?: string
  facebook?: string
}

export function BusinessInformation({
  description,
  website,
  email,
  facebook,
}: BusinessInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && (
          <div>
            <p className="text-sm text-muted-foreground mb-2 font-medium">About</p>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>
        )}

        <div className="space-y-3 pt-2 border-t">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-primary hover:underline"
            >
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span>{website}</span>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span>{email}</span>
            </a>
          )}

          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-primary hover:underline"
            >
              <Share2 className="h-4 w-4 flex-shrink-0" />
              <span>Facebook Page</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


