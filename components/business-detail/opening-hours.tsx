"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

interface OpeningHoursProps {
  hours: OpeningHour[];
}

export function OpeningHours({ hours }: OpeningHoursProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opening Hours</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {hours.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-between border-b border-border pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{item.day}</span>

            <span className="text-muted-foreground">
              {item.closed ? "Closed" : `${item.open} - ${item.close}`}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

