
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowRightLeft,
  Hash,
  Code2,
  Calendar,
  Copy,
  RefreshCw,
} from 'lucide-react';
import {
  format,
  fromUnixTime,
  getUnixTime,
  parse,
  parseISO,
  isValid,
} from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const HUMAN_FORMAT = "yyyy-MM-dd HH:mm:ss";

export function TimestampConverter() {
  const [unix, setUnix] = useState('');
  const [iso, setIso] = useState('');
  const [human, setHuman] = useState('');
  const [updatedFields, setUpdatedFields] = useState<string[]>([]);
  const { toast } = useToast();

  const resetToNow = () => {
    const now = new Date();
    const newUnix = getUnixTime(now).toString();
    const newIso = now.toISOString();
    const newHuman = format(now, HUMAN_FORMAT);

    setUnix(newUnix);
    setIso(newIso);
    setHuman(newHuman);
  };

  useEffect(() => {
    resetToNow();
  }, []);

  const triggerUpdateAnimation = (fields: string[]) => {
    setUpdatedFields(fields);
    setTimeout(() => setUpdatedFields([]), 700);
  };

  const handleUnixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUnix(value);
    if (!value.trim()) return;

    const numValue = parseInt(value, 10);
    if (Number.isInteger(numValue)) {
      const newDate = fromUnixTime(numValue);
      if (isValid(newDate)) {
        setIso(newDate.toISOString());
        setHuman(format(newDate, HUMAN_FORMAT));
        triggerUpdateAnimation(['iso', 'human']);
      }
    }
  };

  const handleIsoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIso(value);
    if (!value.trim()) return;
    
    const newDate = parseISO(value);
    if (isValid(newDate)) {
      setUnix(getUnixTime(newDate).toString());
      setHuman(format(newDate, HUMAN_FORMAT));
      triggerUpdateAnimation(['unix', 'human']);
    }
  };

  const handleHumanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHuman(value);
    if (!value.trim()) return;

    const newDate = parse(value, HUMAN_FORMAT, new Date());
    if (isValid(newDate)) {
      setUnix(getUnixTime(newDate).toString());
      setIso(newDate.toISOString());
      triggerUpdateAnimation(['unix', 'iso']);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: text,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
                <ArrowRightLeft className="w-6 h-6 text-primary" />
                <div>
                    <CardTitle>Timestamp Converter</CardTitle>
                    <CardDescription>
                        Convert between different time formats instantly.
                    </CardDescription>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={resetToNow} aria-label="Reset to now">
                <RefreshCw className="h-5 w-5" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unix" className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-primary" />
              <span>Unix Timestamp (seconds)</span>
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="unix"
                value={unix}
                onChange={handleUnixChange}
                placeholder="e.g. 1672531200"
                className={cn(updatedFields.includes('unix') && 'animate-flash')}
              />
              <Button variant="outline" size="icon" onClick={() => handleCopy(unix)} aria-label="Copy Unix timestamp"><Copy className="h-4 w-4"/></Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iso" className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span>ISO 8601</span>
            </Label>
            <div className="flex items-center space-x-2">
                <Input
                    id="iso"
                    value={iso}
                    onChange={handleIsoChange}
                    placeholder="e.g. 2023-01-01T00:00:00.000Z"
                    className={cn(updatedFields.includes('iso') && 'animate-flash')}
                />
                <Button variant="outline" size="icon" onClick={() => handleCopy(iso)} aria-label="Copy ISO timestamp"><Copy className="h-4 w-4"/></Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="human" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Human Readable</span>
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="human"
                value={human}
                onChange={handleHumanChange}
                placeholder="YYYY-MM-DD HH:mm:ss"
                className={cn(updatedFields.includes('human') && 'animate-flash')}
              />
               <Button variant="outline" size="icon" onClick={() => handleCopy(human)} aria-label="Copy Human-readable timestamp"><Copy className="h-4 w-4"/></Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Format: {HUMAN_FORMAT}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
