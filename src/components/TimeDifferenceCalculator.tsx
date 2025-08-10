
'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TimerOff, ArrowRight } from 'lucide-react';
import { intervalToDuration, formatDuration, isValid } from 'date-fns';

export function TimeDifferenceCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const difference = useMemo(() => {
    if (!date1 || !date2) {
      return null;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (!isValid(d1) || !isValid(d2)) {
      return 'Invalid date';
    }

    const duration = intervalToDuration({
      start: d1,
      end: d2,
    });
    
    if(Object.values(duration).every(v => v === 0)) {
        return "No difference";
    }

    return formatDuration(duration, {
      format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
    });
  }, [date1, date2]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <TimerOff className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Calculate Time Difference</CardTitle>
            <CardDescription>
              Find the duration between two points in time.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="date1">Start Timestamp</Label>
            <Input
              id="date1"
              type="datetime-local"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date2">End Timestamp</Label>
            <Input
              id="date2"
              type="datetime-local"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>

        {difference && (
          <div className="mt-6 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Duration
            </p>
            <p className="text-lg font-semibold text-primary font-mono tracking-tight">
              {difference}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
