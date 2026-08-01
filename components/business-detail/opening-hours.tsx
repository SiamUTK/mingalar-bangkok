'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Clock } from 'lucide-react'

export interface HourEntry {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface OpeningHoursProps {
  hours: HourEntry[]
  openNow: boolean
}

export function OpeningHours({ hours, openNow }: OpeningHoursProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Opening Hours</CardTitle>
          <div
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              openNow
                ? 'bg-success/20 text-success'
                : 'bg-danger/20 text-danger'
            }`}
          >
            {openNow ? 'Open' : 'Closed'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hours.map((entry) => (
            <div key={entry.day} className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{entry.day}</span>
              <span className="text-muted-foreground">
                {entry.closed ? (
                  <span className="font-medium">Closed</span>
                ) : (
                  <span>
                    {entry.open} - {entry.close}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

