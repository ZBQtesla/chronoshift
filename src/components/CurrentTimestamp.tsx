
'use client';

import { useState, useEffect, type FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Clock, Hash, Code2, Calendar } from 'lucide-react';

interface TimestampDisplayProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  onCopy: (value: string) => void;
}

const TimestampDisplay: FC<TimestampDisplayProps> = ({ icon, label, value, onCopy }) => (
  <div className="flex items-center justify-between space-x-4 p-3 bg-background/50 rounded-lg transition-colors hover:bg-muted/60">
    <div className="flex items-center space-x-3">
      <div className="text-primary">{icon}</div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-center space-x-3">
      <code className="text-sm text-foreground font-mono">{value}</code>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onCopy(String(value))}
        aria-label={`Copy ${label}`}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export function CurrentTimestamp() {
  const [now, setNow] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: text,
    });
  };

  const unixTimestamp = now ? Math.floor(now.getTime() / 1000) : 'Loading...';
  const isoTimestamp = now ? now.toISOString() : 'Loading...';
  const humanTimestamp = now ? now.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) : 'Loading...';

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Live Timestamp</CardTitle>
            <CardDescription>
              The current time, updated every second.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <TimestampDisplay
            icon={<Hash size={20} />}
            label="Unix"
            value={unixTimestamp}
            onCopy={handleCopy}
          />
          <TimestampDisplay
            icon={<Code2 size={20} />}
            label="ISO 8601"
            value={isoTimestamp}
            onCopy={handleCopy}
          />
          <TimestampDisplay
            icon={<Calendar size={20} />}
            label="Human-Readable"
            value={humanTimestamp}
            onCopy={handleCopy}
          />
        </div>
      </CardContent>
    </Card>
  );
}
